import React from "react";
import { twMerge } from "tailwind-merge";

import { SkeletonProps } from "./skeletonProps";

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={twMerge(
        "h-2 w-2 bg-background-skeleton rounded animate-pulse",
        className,
      )}
    ></div>
  );
};
