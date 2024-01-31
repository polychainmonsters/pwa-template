import { Transition, Variants } from "framer-motion";

export const backgroundVariants: Variants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

export const transition: Transition = {
  duration: 0.2,
  ease: "easeInOut",
};

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
