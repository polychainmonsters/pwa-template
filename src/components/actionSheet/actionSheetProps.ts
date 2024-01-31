import React from "react";

export interface ActionSheetProps {
  title: string;
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactElement | React.ReactElement[];
  className?: string;
}
