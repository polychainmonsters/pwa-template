import { motion } from "framer-motion";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useLockedBody } from "usehooks-ts";

import { usePrivy } from "@privy-io/react-auth";
import { useToggle } from "@uidotdev/usehooks";

import { useEmbeddedWallet, useUserName } from "../../hooks";
import { DropdownOption } from "../dropdown";
import { Modal } from "../modal";
import { contentTransition, contentVariants } from "./modalProfileMotion";
import { ModalProfileProps } from "./modalProfileProps";
import {
  ActionBar,
  ActionSheet,
  Button,
  Dropdown,
  Ping,
  WalletAddressBox,
} from "..";
import { usePrivyWagmi } from "../../sapphire/PrivyWagmiProvider.tsx";
import { PLACEHOLDER_CHAIN_ID } from "../../chain.ts";
import placeholder from "./placeholder.png";

const REVISION = import.meta.env.VITE_REVISION;

const NETWORKS: DropdownOption[] = [
  {
    label: "Chain: Orbit Testnet",
    value: 421611,
  },
  {
    label: "Chain: Oasis",
    value: 23294,
  },
  {
    label: "Chain: Polygon",
    value: 137,
  },
];

export const ModalProfile = ({
  userName = "",
  walletAddress,
  imageURI = placeholder,
  isVisible,
  onClose,
}: ModalProfileProps) => {
  const { wallet } = usePrivyWagmi();
  const [network, setNetwork] = useState(NETWORKS[0]);
  const handleSetNetwork = (network: DropdownOption) => {
    setNetwork(network);
  };

  // Lock body when modal is visible
  useLockedBody(isVisible, "root");

  const {
    persistUserName,
    isLoading,
    isAlreadyRegistered,
    setNewName,
    newName,
    refetch,
  } = useUserName(wallet?.chainId || PLACEHOLDER_CHAIN_ID, {
    address: walletAddress,
  });

  // Private Wallet logic
  const navigate = useNavigate();

  const { enoughFunds } = useEmbeddedWallet(walletAddress);

  // User Name Action Sheet
  const [actionSheetVisible, toggleActionSheetVisible] = useToggle(false);
  const [isInputFocused, toggleIsInputFocused] = useToggle(false);

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isAlreadyRegistered) {
      setError("Username already taken.");
    }
  }, [isAlreadyRegistered]);

  const isButtonDisabled = useMemo(() => {
    return newName === "" || newName === userName || error !== "" || isLoading;
  }, [newName, userName, error, isLoading]);

  const backgroundColor = useMemo(() => {
    if (isInputFocused) {
      return "bg-background-primary/80";
    }
    return "bg-background-primary/60";
  }, [isInputFocused]);

  const borderColor = useMemo(() => {
    return error === ""
      ? "border-background-primary"
      : "border-background-fire";
  }, [error]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length > 20) {
      setError("Username cannot exceed 20 characters.");
    } else if (/\s/.test(value)) {
      // Check for spaces using a regular expression
      setError("Username cannot contain spaces.");
    } else {
      setNewName(value);
      setError("");
    }
  };

  const { logout, ready, authenticated, user, exportWallet } = usePrivy();

  // Check that your user is authenticated
  const isAuthenticated = ready && authenticated;

  // Check that your user has an embedded wallet
  const hasEmbeddedWallet = !!user?.linkedAccounts.find(
    (account) =>
      account.type === "wallet" && account.walletClientType === "privy",
  );

  const handleLogoutAsync = useCallback(async () => {
    logout()
      .then(() => {
        console.log("Clearing local storage 2...");
        localStorage.clear();
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [logout, navigate]);

  return (
    <Modal isVisible={isVisible}>
      <div className="flex flex-1 flex-col justify-end px-2 space-y-4">
        <div className="flex flex-1 flex-col justify-center">
          <motion.div
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={contentTransition}
            className="relative flex p-2 rounded-3xl w-full bg-background-primary/50 backdrop-blur-xl border border-background-primary/20 shadow-lg"
          >
            <div className="flex flex-1 flex-col pt-4 px-2 pb-2 space-y-2 rounded-2xl bg-background-primary/50 backdrop-blur-sm border border-background-primary/20 shadow-sm">
              <div className="flex flex-col items-center space-y-2">
                <img
                  className="h-auto w-1/3 shadow-sm aspect-square rounded-full"
                  src={imageURI}
                />
                <div
                  className="relative flex"
                  onClick={() => toggleActionSheetVisible()}
                >
                  <h2 className="text-lg text-center font-display font-bold">
                    {userName || "Your Name"}
                  </h2>
                  {!userName && <Ping className="absolute top-0 -right-2" />}
                </div>
              </div>

              <WalletAddressBox address={walletAddress} />

              {REVISION && (
                <div className="flex flex-row justify-center">
                  <span className="text-text-secondary text-xs p-2 text-center">
                    Revision
                    <br />
                    {REVISION.substring(0, 7)}
                  </span>
                </div>
              )}
            </div>

            <Button
              variant="light"
              size="2xs"
              onClick={onClose}
              className="absolute -top-2 -right-2"
            >
              <span className="material-symbols-rounded text-lg">close</span>
            </Button>
          </motion.div>
        </div>

        <ActionBar variant="floating" className="rounded-3xl">
          <div className="flex flex-col flex-1 space-y-2">
            <Dropdown
              disabled
              // label="Select Network"
              options={NETWORKS}
              selected={network}
              onSelect={handleSetNetwork}
            />
            <div className="flex flex-row flex-1 space-x-2">
              <Button
                variant="light"
                size="xs"
                className="flex-1"
                disabled={!isAuthenticated}
                onClick={handleLogoutAsync}
              >
                Logout
              </Button>
              <Button
                variant="light"
                size="xs"
                className="flex-1"
                disabled={!isAuthenticated || !hasEmbeddedWallet}
                onClick={exportWallet}
              >
                Export Wallet
              </Button>
            </div>
          </div>
        </ActionBar>
      </div>
      <ActionSheet
        title="Update User Name"
        isVisible={actionSheetVisible}
        onClose={() => toggleActionSheetVisible()}
      >
        <div className="flex flex-col space-y-4 pt-4">
          <div className="flex flex-col space-y-2 px-4">
            <div
              className={twMerge(
                "rounded-lg border-0.5 font-display font-bold text-lg w-full shadow-sm backdrop-blur-sm",
                backgroundColor,
                borderColor,
              )}
            >
              <input
                type="text"
                value={newName}
                onChange={handleChange}
                onFocus={() => toggleIsInputFocused()}
                onBlur={() => toggleIsInputFocused()}
                placeholder={enoughFunds.eth ? "Your Name" : "Insufficient ETH"}
                disabled={isLoading || !enoughFunds.eth}
                className="p-4 text-text-primary placeholder-text-secondary bg-transparent w-full focus:ring-1 focus:ring-border-primary appearance-none outline-none"
              />
            </div>
            <p className="text-text-error text-sm font-bold">{error}</p>
          </div>

          <div className="flex flex-col px-4">
            <Button
              onClick={async () => {
                await persistUserName?.();
                refetch?.();
                toggleActionSheetVisible();
              }}
              disabled={isButtonDisabled}
            >
              Update
            </Button>
          </div>
        </div>
      </ActionSheet>
    </Modal>
  );
};
