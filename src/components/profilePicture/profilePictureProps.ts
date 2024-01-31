export interface ProfilePictureProps {
  size: number | string;
  imageURI?: string;
  className?: string;
  imageLayoutID?: string;
  onClick?: () => void;
  loading?: boolean;
}
