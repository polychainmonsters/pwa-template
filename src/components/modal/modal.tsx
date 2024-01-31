import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

import { ModalHeader } from "../modalHeader";
import { transition, variants } from "./modalMotion";
import { ModalProps } from "./modalProps";

export const Modal = ({
  isVisible,
  onClose,
  title = "",
  children,
  className,
  classNameOverlay,
  backgroundOpacity = "50",
  blurIntensity = "md",
}: ModalProps) => {
  const bgOpacityClass = `bg-black/${backgroundOpacity}`;
  const blurClass = `backdrop-blur-${blurIntensity}`;
  const renderTitle = title !== "" || onClose !== undefined;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="modal-monster-detail-background"
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}
          transition={transition}
          className={twMerge(
            "fixed inset-0 z-50 flex flex-col px-4 pt-safe-or-4 pb-safe-or-4 overflow-y-auto max-h-full",
            bgOpacityClass,
            blurClass,
            classNameOverlay,
          )}
        >
          {renderTitle && <ModalHeader title={title} onClose={onClose} />}
          <div
            className={twMerge(
              "flex flex-1 flex-col overflow-y-auto pt-4",
              className,
            )}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
