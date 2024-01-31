import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLockedBody } from "usehooks-ts";

import { useLogin, usePrivy } from "@privy-io/react-auth";

import { Button, ModalInstall } from "../../components";
import { useShowInstallMessage } from "../../hooks";
import { contentTransition, contentVariants } from "../../utility";

export const Intro: React.FC = () => {
  const navigate = useNavigate();
  const { ready } = usePrivy();
  const { showInstallMessage } = useShowInstallMessage();
  const [installVisibility, setInstallVisibility] = useState(false);
  useLockedBody(true, "root");

  const { login } = useLogin({
    onComplete: () => {
      navigate("/home", { replace: true });
    },
    onError: console.log,
  });

  const handleLogin = () => {
    if (!ready) return;

    if (showInstallMessage) {
      setInstallVisibility(true);
    } else {
      login();
    }
  };

  const buttonSoundKey = showInstallMessage ? "warning" : "click";

  return (
    <>
      <div className="flex flex-1 bg-no-repeat bg-cover bg-center bg-fixed bg-background-intro sm:bg-background-intro-sm md:bg-background-intro-md lg:bg-background-intro-lg">
        <div className="flex flex-1 px-8 py-safe-or-8 justify-center items-center bg-black/20">
          <motion.div
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={contentTransition}
            className="flex p-2 rounded-2xl w-full max-w-md aspect-[3/4] bg-background-primary/20 backdrop-blur-xl border border-background-primary/20 shadow-lg"
          >
            <div className="flex flex-1 flex-col p-4 space-y-8 rounded-xl backdrop-blur-xl bg-background-primary/60 border border-background-primary/20 shadow-sm">
              <div className="flex flex-1 flex-col space-y-4 justify-center items-center">
                <h1 className="font-display font-black text-center text-2xl bg-gradient-to-b from-primary-500 to-mental-500 bg-clip-text text-transparent">
                  PWA Template
                </h1>
                <p className="text-sm text-center text-text-secondary">
                  Test with your frens & launch something cool based on this
                  app!
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <span
                  className="text-xs text-center text-text-highlight cursor-pointer"
                  onClick={() => window.open("https://github.com", "_blank")}
                >
                  Learn more about the template ↗
                </span>
                <Button variant="light" onClick={handleLogin} disabled={!ready}>
                  Sign Up
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
        <ModalInstall
          isVisible={installVisibility}
          onClose={() => setInstallVisibility(false)}
        />
      </div>
    </>
  );
};
