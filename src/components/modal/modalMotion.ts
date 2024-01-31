import { Transition, Variants } from "framer-motion";

export const variants: Variants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

export const transition: Transition = {
  duration: 0.2,
  ease: "easeInOut",
};
