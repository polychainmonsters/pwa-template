import { motion } from "framer-motion";
import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { UserContext } from "../../context";
import { useShowInstallMessage } from "../../hooks";

export const LayoutAuth: React.FC = () => {
  const location = useLocation();
  const userContext = useContext(UserContext);
  const { showInstallMessage } = useShowInstallMessage();

  if (showInstallMessage) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // If the context isn't provided, it's probably an error in your app structure.
  if (!userContext) {
    console.error("UserContext is not provided");
    return (
      <div className="flex flex-1 justify-center items-center">
        Error: UserContext not provided
      </div>
    );
  }

  const { isLoading, user } = userContext;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col py-safe-or-4">
        <div className="flex flex-1 flex-col justify-center items-center space-y-8">
          <div className="flex flex-col text-center space-y-2 px-8">
            <h1 className="font-display font-black text-2xl text-text-primary">
              Loading the Template
            </h1>
            <p className="text-sm text-text-secondary">
              Hang tight, your journey into the template is about to begin!
            </p>
          </div>

          <motion.div
            className="flex flex-col justify-center items-center w-10 h-10 bg-background-highlight/40 border border-background-highlight/20"
            animate={{
              scale: [1, 1.5, 1.5, 1, 1],
              rotate: [0, 0, 180, 180, 0],
              borderRadius: ["5%", "5%", "50%", "50%", "5%"],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            <motion.div
              className="w-5 h-5 bg-background-highlight/80"
              animate={{
                scale: [1, 1.25, 1.25, 1, 1],
                rotate: [0, 0, 180, 180, 0],
                borderRadius: ["5%", "5%", "50%", "50%", "5%"],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          </motion.div>
        </div>
      </div>
    );
  }

  // If user exists, show the child components, else redirect.
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};
