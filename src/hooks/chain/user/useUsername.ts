import { useCallback, useState } from "react";
import { Address } from "viem";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

import { UsernamesV1Abi } from "../abis";
import { contracts } from "../contracts.ts";
import { PLACEHOLDER_CHAIN_ID } from "../../../chain.ts";

export const useUserName = (
  chainId: string,
  { address }: { address?: Address },
) => {
  const [newName, setNewNameInternal] = useState("");

  const {
    data,
    isLoading,
    refetch,
  }: {
    data: string | undefined;
    isLoading: boolean;
    refetch: () => void;
  } = useContractRead({
    address: contracts[chainId].usernames,
    abi: UsernamesV1Abi,
    functionName: "addressToName",
    args: [address],
    enabled: !!address && chainId !== PLACEHOLDER_CHAIN_ID,
  });

  const { config, error: prepareError } = usePrepareContractWrite({
    address: contracts[chainId].usernames,
    abi: UsernamesV1Abi,
    functionName: "registerName",
    args: [newName],
    enabled: !!newName && chainId !== PLACEHOLDER_CHAIN_ID,
  });

  const {
    write,
    writeAsync,
    data: writeData,
    error: writeError,
    isLoading: isLoadingWrite,
  } = useContractWrite(config);

  const setNewName = useCallback((value: string) => {
    if (value.length < 20 && !/\s/.test(value)) {
      setNewNameInternal(value);
    }
  }, []);

  return {
    userName: data,
    isLoading: isLoading || isLoadingWrite,
    isAlreadyRegistered: !!prepareError,
    refetch,
    setNewName,
    newName,
    persistUserName: writeAsync,
  };
};
