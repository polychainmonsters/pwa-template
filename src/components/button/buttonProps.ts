import { HTMLMotionProps } from "framer-motion";

import { ButtonVariants } from "./buttonVariants";

export interface ButtonProps
  extends HTMLMotionProps<"button">,
    ButtonVariants {}
