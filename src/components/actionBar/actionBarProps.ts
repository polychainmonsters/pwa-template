import { HTMLProps } from "react";
import { ActionBarVariants } from "./actionBarVariants";

export interface ActionBarProps
  extends HTMLProps<HTMLDivElement>,
    ActionBarVariants {
  visible?: boolean;
  className?: string;
}
