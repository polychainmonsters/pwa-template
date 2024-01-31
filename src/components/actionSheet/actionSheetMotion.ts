import { Transition, Variants } from "framer-motion";

export const backgroundVariants: Variants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

export const transition: Transition = {
  duration: 0.2,
  ease: "easeInOut",
};

export const sheetTransition: Transition = {
  type: "spring",
  damping: 20,
  mass: 0.7,
  stiffness: 200,
};

export const sheetVariants: Variants = {
  open: { y: 0, opacity: 1 },
  closed: { y: "100%", opacity: 0 },
};
