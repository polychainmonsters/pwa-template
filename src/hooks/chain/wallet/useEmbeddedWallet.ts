import { useEffect, useMemo, useState } from "react";
import { parseEther } from "viem";
import { Address, useBalance } from "wagmi";

const MIN_ETH = "0.01";
const MINIMUM_BALANCE = parseEther(MIN_ETH);
const MINIMUM_BALANCE_PMON = parseEther("10");

export const useEmbeddedWallet = (walletAddress?: Address) => {
  const {
    data: dataETH,
    isError: isErrorETH,
    isLoading: isLoadingETH,
  } = useBalance({
    address: walletAddress,
  });

  const [enoughFunds, setEnoughFunds] = useState({
    eth: false,
    pmon: false,
  });

  useEffect(() => {
    if (!isLoadingETH && !isErrorETH && dataETH?.value) {
      setEnoughFunds((prev) => ({
        ...prev,
        eth: dataETH.value >= MINIMUM_BALANCE,
      }));
    }
  }, [dataETH, isErrorETH, isLoadingETH]);

  const balances = useMemo(
    () => ({
      eth: dataETH ? `${dataETH.formatted} ${dataETH.symbol}` : "0 ETH",
    }),
    [dataETH],
  );

  return {
    enoughFunds,
    balances,
    minimum: {
      eth: MIN_ETH,
      pmon: MINIMUM_BALANCE_PMON,
    },
  };
};
