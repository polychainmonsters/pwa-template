import { Address } from "wagmi";
import { PLACEHOLDER_CHAIN_ID, sapphire } from "../../chains.ts";
import { zeroAddress } from "viem";

// Interface for the contract addresses
interface IContracts {
  confidentialTester: Address;
  usernames: Address;
}

const sapphireContracts: IContracts = {
  confidentialTester: "0xbf7F09953F01b78f44ba010255438AC240464800",
  usernames: "0x2Cf556C7bDfd88aE569e19dB87Eadf6a32760Ef1",
};

export const contracts: Record<string, IContracts> = {
  [PLACEHOLDER_CHAIN_ID]: {
    confidentialTester: zeroAddress,
    usernames: zeroAddress,
  },
  [`${sapphire.id}`]: sapphireContracts,
  [`eip155:${sapphire.id}`]: sapphireContracts,
};
