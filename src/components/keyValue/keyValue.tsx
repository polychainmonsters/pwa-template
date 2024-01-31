import { twMerge } from "tailwind-merge";

import { KeyValueProps } from "./keyValueProps";
export const KeyValue = ({ keyText, valueText, className }: KeyValueProps) => {
  return (
    <div
      className={twMerge(
        "flex flex-col flex-1 space-y-0 text-center text-2xs uppercase font-black",
        className,
      )}
    >
      <span className="text-text-tertiary">{keyText}</span>
      <span className="text-text-primary">{valueText}</span>
    </div>
  );
};
