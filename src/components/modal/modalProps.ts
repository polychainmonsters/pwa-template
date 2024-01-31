import React from "react";

export interface ModalProps {
  isVisible: boolean;
  onClose?: () => void;
  title?: string;
  className?: string;
  classNameOverlay?: string;
  children?: React.ReactNode;
  backgroundOpacity?: string;
  blurIntensity?: string;
}
