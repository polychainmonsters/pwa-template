import { Chain } from "@wagmi/core";

export const PLACEHOLDER_CHAIN_ID = "0";

export const sapphire = {
  id: 23294,
  name: "Oasis Sapphire",
  network: "sapphire",
  nativeCurrency: {
    decimals: 18,
    name: "Rose",
    symbol: "ROSE",
  },
  rpcUrls: {
    public: {
      http: ["https://sapphire.oasis.io"],
      webSocket: ["wss://sapphire.oasis.io/ws"],
    },
    default: {
      http: ["https://sapphire.oasis.io"],
      webSocket: ["wss://sapphire.oasis.io/ws"],
    },
  },
  blockExplorers: {
    default: {
      name: "Oasis Foundation",
      url: "https://explorer.oasis.io/mainnet/sapphire",
    },
  },
} as const satisfies Chain;

export const sapphireTestnet = {
  id: 23295,
  name: "Oasis Sapphire Testnet",
  network: "sapphireTest",
  nativeCurrency: {
    decimals: 18,
    name: "Rose",
    symbol: "ROSE",
  },
  rpcUrls: {
    public: {
      http: ["https://testnet.sapphire.oasis.dev"],
      webSocket: ["wss://testnet.sapphire.oasis.dev/ws"],
    },
    default: {
      http: ["https://testnet.sapphire.oasis.dev"],
      webSocket: ["wss://testnet.sapphire.oasis.dev/ws"],
    },
  },
  blockExplorers: {
    default: {
      name: "Oasis Foundation",
      url: "https://testnet.explorer.sapphire.oasis.dev/",
    },
  },
} as const satisfies Chain;

export const getChain = (chainId?: string): Chain => {
  switch (chainId) {
    case "23294":
      return sapphire;
    case "23295":
      return sapphireTestnet;
    default:
      return sapphire;
  }
};
