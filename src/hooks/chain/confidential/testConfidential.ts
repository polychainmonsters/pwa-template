import { useCallback, useState } from "react";
import { Address } from "viem";
import { writeContractConfidential } from "../../../sapphire";
import { ConfidentialTesterAbi } from "../abis";
import { contracts } from "../contracts.ts";
import { usePrivyWagmi } from "@privy-io/wagmi-connector";
import { getCleanChainIdString } from "../../../utility";

export const useTestConfidential = () => {
  const { wallet } = usePrivyWagmi();
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | undefined>(undefined);
  const chainId = getCleanChainIdString(wallet?.chainId);

  const writeConfidential = useCallback(async () => {
    setIsLoading(true);

    try {
      const { hash } = await writeContractConfidential({
        request: {
          address: contracts[chainId].confidentialTester,
          abi: ConfidentialTesterAbi,
          args: ["conf test"],
          functionName: "setConfidentialData",
        },
        mode: "prepared",
        chainId: parseInt(chainId),
      });
      setTxHash(hash);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [chainId]);

  return {
    isLoading,
    writeConfidential,
    txHash,
  };
};
