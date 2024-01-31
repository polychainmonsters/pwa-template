import React from "react";

import { ModalHeaderProps } from "./modalHeaderProps";
import { Button } from "..";

export const ModalHeader = ({
  title = "",
  subTitle = "",
  onClose,
}: ModalHeaderProps) => {
  return (
    <div className="flex flex-none justify-center items-center mt-2 select-none">
      {onClose && <div className="w-8 h-8" />}

      <div className="flex flex-col flex-1">
        <h2 className="text-xl text-center text-white font-display font-black">
          {title}
        </h2>
        {subTitle && (
          <span className="text-xs text-center text-white font-display">
            {subTitle}
          </span>
        )}
      </div>

      {onClose && (
        <Button variant="light" size="2xs" onClick={onClose}>
          <span className="material-symbols-rounded text-lg">close</span>
        </Button>
      )}
    </div>
  );
};
