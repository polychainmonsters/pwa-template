import {
  Connector,
  ChainNotConfiguredError,
  ConnectorNotFoundError,
  Address,
} from "wagmi";
import {
  Chain,
  getAddress,
  createWalletClient,
  custom,
  numberToHex,
  UserRejectedRequestError,
  SwitchChainError,
  EIP1193Provider,
} from "viem";
import { ConnectorData } from "@wagmi/core";
import { ConnectedWallet } from "@privy-io/react-auth";
import { wrapWalletClient } from "./wrapWalletClient.ts";

function convertToNumber(input: string | bigint | number): number {
  if (typeof input === "string") {
    return Number.parseInt(input, input.trim().startsWith("0x") ? 16 : 10);
  } else if (typeof input === "bigint") {
    return Number(input);
  } else {
    return input;
  }
}

type ErrorWithCode = Error & { code?: number };

// todo proper types
type ConstructorArgs = {
  chains: Chain[];
  logout: () => void;
  activeWallet?: ConnectedWallet;
};

export class PrivyWagmiConnector extends Connector {
  id = "privy";
  name = "Privy";
  activeWallet: ConnectedWallet | undefined;

  provider?: EIP1193Provider;
  logoutFromPrivy;

  constructor({ logout, chains, activeWallet }: ConstructorArgs) {
    super({ chains, options: undefined });

    this.logoutFromPrivy = logout;
    this.activeWallet = activeWallet;
  }

  get ready() {
    return !!this.activeWallet;
  }

  async connect({ chainId }: { chainId?: number } = {}) {
    this.emit("message", { type: "connecting" });

    // Get the account details
    const account = await this.getAccount();

    // Refresh the provider information
    await this.refreshProvider();

    // Get the current chain ID
    let currentChainId = await this.getChainId();

    // Check if the current chain is supported
    let isUnsupported = this.isChainUnsupported(currentChainId);

    // If a specific chainId is provided and it's different from the current, switch to it
    if (chainId && currentChainId !== chainId) {
      let switchedChain = await this.switchChain(chainId);
      currentChainId = switchedChain.id;
      isUnsupported = this.isChainUnsupported(currentChainId);
    }

    // Return the account and chain information
    return {
      account,
      chain: { id: currentChainId, unsupported: isUnsupported },
    };
  }

  async disconnect() {
    this.provider && this.removeProviderListeners(this.provider);
  }

  getActiveWallet() {
    return this.activeWallet;
  }

  async getAccount() {
    if (!this.activeWallet) throw new ConnectorNotFoundError();
    return getAddress(this.activeWallet.address);
  }

  async getChainId(): Promise<number> {
    const rpcResult = await (
      await this.getProvider()
    ).request({ method: "eth_chainId" });
    return convertToNumber(rpcResult);
  }

  async getProvider(): Promise<EIP1193Provider> {
    if (!this.activeWallet) throw new ConnectorNotFoundError();
    if (!this.provider)
      try {
        const ethereumProvider = await this.activeWallet.getEthereumProvider();
        // @ts-ignore
        this.provider = ethereumProvider;
      } catch {
        throw new ConnectorNotFoundError();
      }
    return this.provider!;
  }

  async getWalletClient({ chainId }: { chainId?: number } = {}) {
    console.log("getwalletclient");
    let [provider, account] = await Promise.all([
      this.getProvider(),
      this.getAccount(),
    ]);
    const chain: Chain = this.chains.find((i) => i.id === chainId)!;
    return wrapWalletClient(
      createWalletClient({
        account,
        chain,
        transport: custom(provider),
      }),
    );
  }

  async isAuthorized() {
    const [provider, account, isConnected] = await Promise.all([
      this.getProvider(),
      this.getAccount(),
      this.activeWallet?.isConnected(),
    ]);
    return !!provider && !!account && !!isConnected;
  }

  onAccountsChanged(accounts: Address[]) {
    if (accounts.length === 0) {
      this.emit("disconnect");
    } else {
      // Assuming `this.activeWallet.address` is a valid Ethereum address
      // `getAddress` will return the checksummed address or throw an error if invalid
      if (this.activeWallet) {
        this.emit("change", { account: getAddress(this.activeWallet.address) });
      }
    }
  }

  onChainChanged = (chainId: number | string) => {
    const chainIdAsNumber = convertToNumber(chainId);
    const isUnsupported = this.isChainUnsupported(chainIdAsNumber);
    this.emit("change", {
      chain: { id: chainIdAsNumber, unsupported: isUnsupported },
    });
  };

  async onDisconnect(error: Error) {
    ((error as ErrorWithCode)?.code === 1013 &&
      (await this.getProvider()) &&
      (await this.getAccount())) ||
      this.emit("disconnect");
  }

  async setActiveWallet(activeWallet: ConnectedWallet) {
    this.activeWallet = activeWallet;
    let t = await this.getChainId();
    await this.refreshProvider();
    let n = await this.getChainId();
    if (t && t !== n)
      try {
        await this.switchChain(t);
      } catch {
        console.warn(
          "Unable to switch new active wallet to the network of previously active wallet.",
        );
      }
    if (this.activeWallet) {
      this.onAccountsChanged([this.activeWallet.address as Address]);
    } else {
      this.onAccountsChanged([]);
    }
  }

  async switchChain(chainId: number) {
    let provider = await this.getProvider(),
      hexChainId = numberToHex(chainId);

    try {
      let chainSwitched: Promise<void> = new Promise((resolve) => {
        let handleChange = ({ chain: currentChain }: ConnectorData) => {
          if (currentChain?.id === chainId) {
            this.off("change", handleChange);
            resolve();
          }
        };
        this.on("change", handleChange);
      });

      await Promise.all([
        chainSwitched,
        provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: hexChainId.toString() }],
        }),
      ]);

      return (
        this.chains.find((chain) => chain.id === chainId) ?? {
          id: chainId,
          name: `Chain ${hexChainId}`,
          network: `${hexChainId}`,
          nativeCurrency: { name: "Ether", decimals: 18, symbol: "ETH" },
          rpcUrls: { default: { http: [""] }, public: { http: [""] } },
        }
      );
    } catch (error: unknown) {
      let chainConfig = this.chains.find((chain) => chain.id === chainId);
      if (!chainConfig)
        throw new ChainNotConfiguredError({
          chainId: chainId,
          connectorId: this.id,
        });

      if ((error as ErrorWithCode).code === 4902) {
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: hexChainId,
                chainName: chainConfig.name,
                nativeCurrency: chainConfig.nativeCurrency,
                rpcUrls: [chainConfig.rpcUrls.public?.http[0] ?? ""],
                blockExplorerUrls: this.getBlockExplorerUrls(chainConfig),
              },
            ],
          });
          return chainConfig;
        } catch (addError) {
          throw new UserRejectedRequestError(addError as Error);
        }
      }

      throw this.isUserRejectedError(error as Error)
        ? new UserRejectedRequestError(error as Error)
        : new SwitchChainError(error as Error);
    }
  }

  private addProviderListeners(provider: EIP1193Provider) {
    provider.on("accountsChanged", this.onAccountsChanged.bind(this));
    provider.on("chainChanged", this.onChainChanged);
    provider.on("disconnect", this.onDisconnect.bind(this));
  }

  private removeProviderListeners(provider: EIP1193Provider) {
    provider.removeListener(
      "accountsChanged",
      this.onAccountsChanged.bind(this),
    );
    provider.removeListener("chainChanged", this.onChainChanged);
    provider.removeListener("disconnect", this.onDisconnect.bind(this));
  }

  private isUserRejectedError(error: Error) {
    return /(user rejected)/i.test(error.message);
  }

  async refreshProvider() {
    let oldProvider = this.provider;
    this.provider = undefined;

    let newProvider = await this.getProvider();

    if (oldProvider) {
      this.removeProviderListeners(oldProvider);
    }

    this.addProviderListeners(newProvider);
  }
}
