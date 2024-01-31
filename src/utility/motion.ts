import { Transition, Variants } from "framer-motion";

export const contentVariants: Variants = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 100, opacity: 0 },
};

export const contentTransition: Transition = {
  type: "spring",
  damping: 20,
  stiffness: 150,
};
