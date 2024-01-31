import { motion } from "framer-motion";
import React from "react";
import { useLockedBody } from "usehooks-ts";

import { useOperatingSystem } from "../../hooks";
import { Button } from "../button";
import { Modal } from "../modal";
import { transitions, variants } from "./modalInstallMotion";
import { ModalInstallProps } from "./modalInstallProps";

export const ModalInstall: React.FC<ModalInstallProps> = ({
  isVisible,
  onClose,
}) => {
  // Lock body when modal is visible
  useLockedBody(isVisible, "root");

  const { isAndroid, isIOS } = useOperatingSystem();
  const isDesktop = !isAndroid && !isIOS;
  return (
    <Modal
      isVisible={isVisible}
      className="flex flex-co items-center justify-center"
    >
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transitions}
        className="relative flex p-2 rounded-2xl w-full max-w-md aspect-[3/4] bg-background-primary/60 backdrop-blur-xl border border-background-primary/20 shadow-lg"
      >
        <div className="flex flex-1 flex-col p-4 rounded-xl bg-background-primary border border-background-primary/20 shadow-sm">
          <div className="flex flex-1 flex-col space-y-8 justify-center text-center">
            <h1 className="font-display font-black text-2xl">
              {isDesktop ? "Open On Smartphone" : "Add To Home Screen"}
            </h1>
            <div className="space-y-8 text-text-secondary">
              {isDesktop ? (
                <div className="flex flex-col space-y-8 items-center">
                  <p>
                    Using a desktop browser?{" "}
                    <strong>Open this App on your Smartphone</strong> to get
                    started!
                  </p>
                  <div className="flex flex-col space-y-2 items-center">
                    <img src="/public/qr.png" className="w-40 h-40" />
                    <span className="font-display font-black text-2xs">
                      Scan to open on smartphone
                    </span>
                  </div>
                </div>
              ) : (
                <p>
                  Dive into the <strong>Template App</strong> and test with your
                  frens, all from your home screen!
                </p>
              )}
              {isAndroid && (
                <p>
                  Using Chrome? Tap the three-dot menu, pick{" "}
                  <strong>Add to Home Screen</strong>, and step into the arena
                  with your frens anytime!
                </p>
              )}
              {isIOS && (
                <p>
                  Safari users, hit that Share icon and select{" "}
                  <strong>Add to Home Screen</strong>. Open up a world of
                  on-chain adventures right from there!
                </p>
              )}
            </div>
          </div>

          <Button
            variant="light"
            size="2xs"
            onClick={onClose}
            className="absolute top-4 right-4"
          >
            <span className="material-symbols-rounded text-lg">close</span>
          </Button>
        </div>
      </motion.div>
    </Modal>
  );
};
