import { Chain, ChainProviderFn } from "wagmi";
import * as sapphire from "@oasisprotocol/sapphire-paratime";
import { isSapphire } from "./isSapphire.ts";

export const sapphireWrapProvider =
  (wagmiChainProviderFunction: ChainProviderFn) => (chain: Chain) => {
    const wagmiChainProvider = wagmiChainProviderFunction(chain);

    if (wagmiChainProvider === null) {
      return null;
    }

    // @ts-ignore
    (wagmiChainProvider as any)._provider = wagmiChainProvider.provider;

    if (isSapphire(chain.id)) {
      // @ts-ignore
      wagmiChainProvider.provider = () =>
        sapphire.wrap((wagmiChainProvider as any)._provider());

      console.log("sapphireWrapProvider: wrapped sapphire provider");
    }

    return wagmiChainProvider;
  };
