import React from "react";

import { PingProps } from "./pingProps";

export const Ping = ({
  color = "bg-background-highlight",
  className = "",
}: PingProps) => (
  <div className={className}>
    <span className="relative flex h-2 w-2">
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-50`}
      />
      <span className={`relative inline-flex rounded-full h-2 w-2 ${color}`} />
    </span>
  </div>
);
