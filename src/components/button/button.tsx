import { motion } from "framer-motion";
import React, { forwardRef, useCallback } from "react";
import { twMerge } from "tailwind-merge";

import { ButtonProps } from "./buttonProps";
import { buttonVariants } from "./buttonVariants";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children = "Button", variant, size, onClick, ...props },
    ref,
  ) => {
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
      },
      [onClick],
    );

    return (
      <motion.button
        className={twMerge(buttonVariants({ variant, size }), className)}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
