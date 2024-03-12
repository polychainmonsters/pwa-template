import {
  Abi,
  Account,
  Chain,
  EIP1193Provider,
  encodeFunctionData,
  toBytes,
  WriteContractParameters,
} from "viem";
import {
  ChainMismatchError,
  getNetwork,
  getWalletClient,
  WriteContractPreparedArgs,
  WriteContractResult,
} from "@wagmi/core";
import { ConnectorNotFoundError } from "wagmi";
import { getChain, sapphire } from "../chains.ts";
import {
  fetchRuntimePublicKeyByChainId,
  lazy as lazyCipher,
  X25519DeoxysII,
} from "./cipher.ts";
import { getCleanChainId } from "../utility";

async function fetchRuntimePublicKey(
  {
    request,
  }: {
    request: EIP1193Provider["request"];
  },
  chainId?: number
): Promise<Uint8Array> {
  try {
    const resp: any = await request({
      method: "oasis_callDataPublicKey" as any,
      args: [],
    });
    if (resp && "key" in resp) {
      return toBytes(resp.key);
    }
  } catch (e: any) {
    console.error(
      "failed to fetch runtime public key using upstream transport:",
      e
    );
  }
  if (!chainId)
    throw new Error("unable to fetch runtime public key. chain not provided");
  return fetchRuntimePublicKeyByChainId(chainId);
}

export function assertActiveChain({ chainId }: { chainId: number }) {
  // Check that active chain and target chain match
  const { chain: activeChain, chains } = getNetwork();
  const activeChainId = activeChain?.id;
  if (activeChainId && chainId !== activeChainId) {
    throw new ChainMismatchError({
      activeChain:
        chains.find((x) => x.id === activeChainId)?.name ??
        `Chain ${activeChainId}`,
      targetChain:
        chains.find((x) => x.id === chainId)?.name ?? `Chain ${chainId}`,
    });
  }
}

/**
 * @description Function to call a contract write method in a confidential way on Oasis Sapphire
 */
export async function writeContractConfidential<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string
>(
  config: WriteContractPreparedArgs<TAbi, TFunctionName>
): Promise<WriteContractResult> {
  const chainId = getCleanChainId(config.chainId);
  const chain = getChain(`${chainId}`);

  const walletClient = await getWalletClient({ chainId });

  if (!walletClient) throw new ConnectorNotFoundError();
  if (config.chainId) assertActiveChain({ chainId });

  let request: WriteContractParameters<TAbi, TFunctionName, Chain, Account> =
    config.request;

  if (chainId === sapphire.id) {
    const cipher = lazyCipher(async () => {
      const rtPubKey = await fetchRuntimePublicKey(
        walletClient.transport,
        chainId
      );
      return X25519DeoxysII.ephemeral(rtPubKey);
    });

    const data = encodeFunctionData({
      abi: request.abi,
      args: request.args,
      functionName: request.functionName,
    } as any);

    const encryptedData = await cipher.encryptEncode(data);

    const hash = await walletClient.sendTransaction({
      data: encryptedData,
      to: request.address,
      chain,
      ...request,
    } as any); // todo debug the exact typescript issues here

    return { hash };
  } else {
    const hash = await walletClient.writeContract({
      ...request,
      chain,
    } as WriteContractParameters<TAbi, TFunctionName, Chain, Account>);

    return { hash };
  }
}
