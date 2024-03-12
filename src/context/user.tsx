import React, { createContext, useEffect, useState } from "react";
import { Address } from "viem";

import { usePrivy } from "@privy-io/react-auth";
import { usePrivyWagmi } from "@privy-io/wagmi-connector";

import { getChain, PLACEHOLDER_CHAIN_ID } from "../chains.ts";
import { useUserName } from "../hooks";
import { setUser } from "../errorHandler.ts";

type ProviderProps = {
  children: React.ReactNode;
};

type ContextProps = {
  nonce: number;
  userName: string;
  user: Address;
  walletAddress: Address;
  isLoading: boolean;
};

export const UserContext = createContext<ContextProps | undefined>(undefined);

export const UserProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [nonce, setNonce] = useState(0);

  const { ready, user: privyUser } = usePrivy();
  const { wallet, ...rest } = usePrivyWagmi();

  useEffect(() => {
    const activeChain = getChain(import.meta.env.VITE_CHAIN_ID as string);
    wallet?.switchChain(activeChain.id);
  }, [wallet]);

  const { userName } = useUserName(wallet?.chainId || PLACEHOLDER_CHAIN_ID, {
    address: wallet?.address as Address,
  });

  const isInitialFetchDone = true;

  useEffect(() => {
    if (wallet?.address) {
      setUser(wallet?.address as Address);
    }
  }, [wallet?.address]);

  useEffect(() => {
    if (ready && !privyUser) {
      setIsLoading(false);
    }

    if (privyUser && wallet && isInitialFetchDone) {
      setIsLoading(false);
    }
  }, [isInitialFetchDone, privyUser, ready, wallet]);

  return (
    <UserContext.Provider
      value={{
        nonce,
        userName: userName || "",
        user: wallet?.address as Address,
        walletAddress: wallet?.address as Address,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
