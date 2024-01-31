import "./App.css";

import { useEffect, useRef } from "react";
import { useOrientation } from "react-use";
import { Workbox } from "workbox-window";
import { configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import { PrivyClientConfig, PrivyProvider } from "@privy-io/react-auth";

import { AppRouter } from "./AppRouter";
import { getChain } from "./chain.ts";
import { ModalOrientation } from "./components";
import { UserProvider } from "./context";
import { useLockOrientation, useOperatingSystem } from "./hooks";
import { PrivyWagmiProvider, sapphireWrapProvider } from "./sapphire";

const activeChain = getChain(import.meta.env.VITE_CHAIN_ID as string);

const configureChainsConfig = configureChains(
  [activeChain],
  [sapphireWrapProvider(publicProvider())],
);

const TEST_PRIVY_ID = import.meta.env.VITE_PRIVY_ID as string;

const privyClientConfig: PrivyClientConfig = {
  additionalChains: [activeChain],
  supportedChains: [activeChain],
  defaultChain: activeChain,
  loginMethods: ["wallet", "email", "google", "apple", "github", "discord"],

  embeddedWallets: {
    createOnLogin: "users-without-wallets",
    noPromptOnSignature: true,
  },
  appearance: {
    theme: "light",
    accentColor: "#64748b",
  },
  legal: {
    termsAndConditionsUrl: "https://your-terms-and-conditions-url/5",
    privacyPolicyUrl: "https://your-privacy-policy-url/5",
  },
};

function App() {
  const wb = useRef<InstanceType<typeof Workbox>>();
  const registration = useRef<ServiceWorkerRegistration>();

  useLockOrientation();

  const { isIOS, isAndroid } = useOperatingSystem();
  const { type: orientation } = useOrientation();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      wb.current = new Workbox(
        import.meta.env.MODE === "production" ? "/sw.js" : "/dev-sw.js?dev-sw",
        {
          type: import.meta.env.MODE === "production" ? "classic" : "module",
        },
      );

      wb.current?.addEventListener("controlling", (event) => {
        window.location.reload();
      });

      wb.current.register().then((swRegistration) => {
        registration.current = swRegistration;
      });
    }
  }, []);

  if (
    (isIOS || isAndroid) &&
    (orientation === "landscape" || orientation === "landscape-primary")
  ) {
    return <ModalOrientation />;
  }

  return (
    <div className="App">
      <PrivyProvider appId={TEST_PRIVY_ID} config={privyClientConfig}>
        <PrivyWagmiProvider wagmiChainsConfig={configureChainsConfig}>
          <UserProvider>
            <AppRouter />
          </UserProvider>
        </PrivyWagmiProvider>
      </PrivyProvider>
    </div>
  );
}

export default App;
