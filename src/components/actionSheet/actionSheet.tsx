import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { twMerge } from "tailwind-merge";

import { Button } from "../button";
import {
  backgroundVariants,
  sheetTransition,
  sheetVariants,
  transition,
} from "./actionSheetMotion";
import { ActionSheetProps } from "./actionSheetProps";

export const ActionSheet: React.FC<ActionSheetProps> = ({
  children,
  isVisible,
  title,
  onClose,
  className,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="action-sheet-background"
          initial="closed"
          animate="open"
          exit="closed"
          variants={backgroundVariants}
          transition={transition}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-25"
        >
          <motion.div
            key="action-sheet"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sheetVariants}
            transition={sheetTransition}
            className={twMerge(
              "bg-background-primary/40 backdrop-blur-md rounded-t-2xl shadow-lg pt-4 pb-safe-or-2 px-2 w-full max-w-2xl",
              className,
            )}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="w-8 h-8" />
              <h2 className="text-xl text-center text-white font-display font-bold">
                {title}
              </h2>
              <Button
                variant="light"
                size="2xs"
                onClick={onClose}
                sound="close"
              >
                <span className="material-symbols-rounded text-lg">close</span>
              </Button>
            </div>

            <div className="space-y-2">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
