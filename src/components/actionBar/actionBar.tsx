import { motion } from "framer-motion";
import React from "react";
import { twMerge } from "tailwind-merge";

import { animateVariants } from "./actionBarMotion";
import { ActionBarProps } from "./actionBarProps";
import { actionBarVariants } from "./actionBarVariants";

export const ActionBar: React.FC<ActionBarProps> = ({
  children,
  variant,
  visible = true,
  className,
}) => {
  return (
    <motion.div
      initial="visible"
      animate={visible ? "visible" : "hidden"}
      variants={animateVariants}
      className={twMerge(actionBarVariants({ variant }), className)}
    >
      {children}
    </motion.div>
  );
};
