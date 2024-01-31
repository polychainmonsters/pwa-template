import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PrivyWagmiConnector } from "./PrivyWagmiConnector.ts";
import { ConnectedWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import {
  createConfig,
  useAccount,
  useConnect,
  useSwitchNetwork as useSwitchWagmiNetwork,
  useWalletClient,
  WagmiConfig,
} from "wagmi";
import { SwitchNetworkArgs } from "@wagmi/core";

const SELECTED_WALLET_KEY = "privy:wagmi:selected-wallet";
const SELECTED_WALLET_TIMESTAMP_KEY = "privy:wagmi:selected-wallet-timestamp";

const stringifyWallet = (wallet: ConnectedWallet) =>
  JSON.stringify({
    address: wallet.address,
    walletClientType: wallet.walletClientType,
    connectorType: wallet.connectorType,
  });

const parseWallet = (walletString: string) => {
  try {
    return JSON.parse(walletString);
  } catch (err) {
    return null;
  }
};

const saveWalletToLocalStorage = (
  wallet: ConnectedWallet,
  storage = localStorage,
) => {
  storage.setItem(SELECTED_WALLET_KEY, stringifyWallet(wallet));
  storage.setItem(SELECTED_WALLET_TIMESTAMP_KEY, Date.now().toString());
};

const clearWalletFromLocalStorage = (storage = localStorage) => {
  storage.removeItem(SELECTED_WALLET_KEY);
  storage.removeItem(SELECTED_WALLET_TIMESTAMP_KEY);
};

const getWalletFromLocalStorage = (storage = localStorage) => {
  const walletString = storage.getItem(SELECTED_WALLET_KEY);
  const timestampString = storage.getItem(SELECTED_WALLET_TIMESTAMP_KEY);

  if (!walletString || !timestampString) return null;

  const wallet = parseWallet(walletString);

  return wallet ? { value: wallet, storedAt: Number(timestampString) } : null;
};

export const PrivyWagmiProvider = ({
  wagmiChainsConfig: { chains, publicClient },
  children,
}: any) => {
  // eslint-disable-next-line no-undef
  const { logout } = usePrivy();
  const { wallets } = useWallets();
  const [wallet, setWallet] = useState<ConnectedWallet | undefined>();
  const onUpdateWallet = useCallback(
    (newWallet?: ConnectedWallet) => {
      if (newWallet) {
        saveWalletToLocalStorage(newWallet);
        setWallet(newWallet);
      } else {
        clearWalletFromLocalStorage();
        setWallet(undefined);
      }
    },
    [setWallet],
  );

  useEffect(() => {
    const walletFromStorage = getWalletFromLocalStorage();
    if (!walletFromStorage) return;
    if (
      wallet &&
      wallets[0] &&
      walletFromStorage.storedAt < wallets[0].connectedAt
    ) {
      onUpdateWallet(undefined);
      return;
    }
    const newWallet = wallets.find(
      (w) =>
        w.address === walletFromStorage.value.address &&
        w?.connectorType === walletFromStorage.value.connectorType &&
        w.walletClientType === walletFromStorage.value.walletClientType,
    );
    setWallet(newWallet);
  }, [wallets]);

  const currentWallet = wallet ?? wallets[0];
  const connector = useMemo(() => {
    return new PrivyWagmiConnector({
      logout,
      chains,
    });
  }, []);
  const config = useMemo(() => {
    return createConfig({
      autoConnect: true,
      connectors: [connector],
      publicClient,
    });
  }, [connector]);
  useEffect(() => {
    if (currentWallet) {
      connector.setActiveWallet(currentWallet);
    }
  }, [currentWallet]);

  return (
    <context.Provider
      value={{
        connector,
        activeWallet: currentWallet,
        setActiveWallet: onUpdateWallet,
      }}
    >
      <WagmiConfig config={config}>
        <Container>{children}</Container>
      </WagmiConfig>
    </context.Provider>
  );
};

const defaultSetActiveWallet = () => {
  throw new Error(
    "You must wrap your application with the `PrivyWagmiConnector` to invoke `setActiveWallet`",
  );
};

type Context = {
  connector?: PrivyWagmiConnector;
  activeWallet?: ConnectedWallet;
  setActiveWallet: (wallet?: ConnectedWallet) => void;
};

const context = createContext<Context>({
  setActiveWallet: defaultSetActiveWallet,
});

const useWalletContext = () => {
  const { connector } = useContext(context);
  return { connector };
};

const Container = ({ children }: { children: ReactNode }) => {
  const { connector } = useWalletContext();
  const { refetch } = useWalletClient();
  const { isConnected } = useAccount();
  const { connect, connectors, isLoading } = useConnect({ connector });

  useEffect(() => {
    if (
      !isConnected &&
      !isLoading &&
      connectors.length &&
      connector?.activeWallet
    ) {
      connect();
    }
    refetch();
  }, [connector?.activeWallet]);

  return <>{children}</>;
};

export const usePrivyWagmi = () => {
  const { connector, activeWallet, setActiveWallet } = useContext(context);
  return { ready: connector?.ready, wallet: activeWallet, setActiveWallet };
};

const useSwitchNetwork = (config: SwitchNetworkArgs) => {
  return useSwitchWagmiNetwork({
    throwForSwitchChainNotSupported: true,
    ...config,
  });
};
