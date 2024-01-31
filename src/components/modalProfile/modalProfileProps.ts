import { Address } from "wagmi";

export interface ModalProfileProps {
  userName?: string;
  walletAddress: Address;
  imageURI?: string;
  isVisible: boolean;
  onClose: () => void;
  source?: string;
}
