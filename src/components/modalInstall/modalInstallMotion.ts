import { Transition, Variants } from "framer-motion";

export const variants: Variants = {
  initial: { y: 200, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 200, opacity: 0 },
};

export const transitions: Transition = {
  type: "spring",
  damping: 20,
  stiffness: 150,
};
