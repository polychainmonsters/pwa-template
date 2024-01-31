import { VariantProps, cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-display font-black border transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-background-disabled disabled:text-text-disabled disabled:shadow-none",
  {
    variants: {
      variant: {
        light:
          "bg-background-primary text-text-primary shadow-sm border-background-primary/20",
        dark: "bg-base-800 text-text-light border-background-primary/20",

        unselected:
          "bg-background-dark/10 text-text-light shadow-inner border-background-primary/30",

        // Element-specific variants
        toxic:
          "bg-background-toxic text-text-light border-background-primary/40",
        mental:
          "bg-background-mental text-text-light border-background-primary/40",
        fire: "bg-background-fire text-text-light border-background-primary/40",
        water:
          "bg-background-water text-text-light border-background-primary/40",
        nature:
          "bg-background-nature text-text-light border-background-primary/40",
        electric:
          "bg-background-electric text-text-light border-background-primary/40",
      },
      size: {
        lg: "h-14 px-4 py-2 text-lg",
        md: "h-12 px-4 py-2 text-base",
        sm: "h-11 px-3 text-sm",
        xs: "h-10 px-2 text-sm",
        "2xs": "h-8 w-8 text-xs",
      },
    },
    defaultVariants: {
      variant: "light",
      size: "md",
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export type ButtonVariant =
  | "light"
  | "dark"
  | "unselected"
  | "toxic"
  | "mental"
  | "fire"
  | "water"
  | "nature"
  | "electric";
