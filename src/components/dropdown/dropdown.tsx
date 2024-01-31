import React, { useCallback, useRef, useState } from "react";

import { DropdownOption, DropdownProps } from "./dropdownProps";

export const Dropdown = ({
  disabled,
  options,
  selected,
  onSelect,
  label,
}: DropdownProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const onChangeInternal = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedOption = options.find((option: DropdownOption) => {
        return String(option.value) === String(e.target.value);
      }) as DropdownOption;

      !!selectedOption && onSelect(selectedOption);
      setIsFocused(false);
    },
    [onSelect, options],
  );

  return (
    <div className="relative flex flex-col space-y-1  w-full" ref={wrapperRef}>
      {label !== undefined && (
        <span className="pl-2 font-display text-sm text-text-light">
          {label}
        </span>
      )}
      <div className="relative flex flex-col">
        <select
          disabled={disabled}
          value={selected?.value}
          onChange={onChangeInternal}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="h-10 px-4 text-sm text-left font-display text-text-primary rounded-full border-0.5 shadow-sm backdrop-blur-sm bg-background-primary/80 border-background-primary focus:ring-1 focus:ring-border-primary appearance-none outline-none"
        >
          {!selected && (
            <option key={-1} value={""}>
              Select an option
            </option>
          )}
          {options?.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>

        <div className="flex absolute right-0 top-0 bottom-0 items-center pr-4 pointer-events-none">
          <i className="material-symbols-rounded text-lg text-text-primary">
            {isFocused ? "expand_less" : "expand_more"}
          </i>
        </div>
      </div>
    </div>
  );
};
