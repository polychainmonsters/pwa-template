import { Chain, ChainProviderFn } from "wagmi";
import { sapphire as sapphireMainnet } from "../chain.ts";
import * as sapphire from "@oasisprotocol/sapphire-paratime";

export const sapphireWrapProvider =
  (wagmiChainProviderFunction: ChainProviderFn) => (chain: Chain) => {
    const wagmiChainProvider = wagmiChainProviderFunction(chain);

    if (wagmiChainProvider === null) {
      return null;
    }

    // @ts-ignore
    (wagmiChainProvider as any)._provider = wagmiChainProvider.provider;

    if (chain.id === sapphireMainnet.id) {
      console.log("Wrapping provider...");

      // @ts-ignore
      wagmiChainProvider.provider = () =>
        sapphire.wrap((wagmiChainProvider as any)._provider());
    }

    return wagmiChainProvider;
  };
