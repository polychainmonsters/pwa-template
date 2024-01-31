import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useCopyToClipboard } from "@uidotdev/usehooks";

import { useEmbeddedWallet } from "../../hooks";
import { shortenAddress } from "../../utility";
import { WalletAddressBoxProps } from "./walletAddressBoxProps";
import { Button } from "..";

export const WalletAddressBox: React.FC<WalletAddressBoxProps> = ({
  address,
}) => {
  const [copiedText, copyToClipboard] = useCopyToClipboard();

  // Copy Wallet Address logic
  const [isPressed, setIsPressed] = useState(false);
  const { balances } = useEmbeddedWallet(address);

  const balance = balances.eth;

  const handleClick = useCallback(() => {
    if (!address) return;
    copyToClipboard(address);
    setIsPressed(true);
  }, [address, copyToClipboard]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isPressed) {
      timer = setTimeout(() => setIsPressed(false), 1000); // Reset after 1 second
    }
    return () => clearTimeout(timer);
  }, [isPressed]);

  const buttonClass = useMemo(() => {
    return isPressed
      ? "flex-none bg-background-nature text-text-light"
      : "flex-none";
  }, [isPressed]);

  const spanClass = useMemo(() => {
    return `material-symbols-rounded text-base ${
      isPressed ? "text-text-light" : ""
    }`;
  }, [isPressed]);

  const shortenedAddress = useMemo(
    () => shortenAddress(address || ""),
    [address],
  );

  return (
    <div className="flex flex-row w-full p-4 space-x-2 rounded-lg backdrop-blur-sm bg-background-primary/60 border border-background-primary/20 shadow-sm">
      <div className="flex flex-1 flex-col">
        <span className="font-display text-sm">{balance}</span>
        <span className="font-mono font-regular text-xs">
          {shortenedAddress}
        </span>
      </div>
      <Button
        variant="light"
        size="2xs"
        onClick={handleClick}
        className={buttonClass}
      >
        <span className={spanClass}>
          {isPressed ? "check" : "content_copy"}
        </span>
      </Button>
    </div>
  );
};
