import { VariantProps, cva } from "class-variance-authority";

export const actionBarVariants = cva(
  "flex flex-row bg-background-primary/40 backdrop-blur-sm border border-t border-background-primary/20",
  {
    variants: {
      variant: {
        sticky: "p-4 space-x-4 shadow-md w-full",
        floating: "p-2 space-x-2 shadow-xl rounded-full",
      },
    },
    defaultVariants: {
      variant: "sticky",
    },
  },
);

export type ActionBarVariants = VariantProps<typeof actionBarVariants>;
