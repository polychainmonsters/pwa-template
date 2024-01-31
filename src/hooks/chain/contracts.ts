import { Address } from "wagmi";
import { PLACEHOLDER_CHAIN_ID, sapphire } from "../../chain.ts";
import { zeroAddress } from "viem";

// Interface for the contract addresses
interface IContracts {
  usernames: Address;
}

const sapphireContracts: IContracts = {
  usernames: "0x2Cf556C7bDfd88aE569e19dB87Eadf6a32760Ef1",
};

export const contracts: Record<string, IContracts> = {
  [PLACEHOLDER_CHAIN_ID]: {
    usernames: zeroAddress,
  },
  [`${sapphire.id}`]: sapphireContracts,
  [`eip155:${sapphire.id}`]: sapphireContracts,
};
