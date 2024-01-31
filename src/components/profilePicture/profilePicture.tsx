import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { ProfilePictureProps } from "./profilePictureProps";
import { Skeleton } from "..";
import placeholder from "./placeholder.png";

export const ProfilePicture = ({
  size = 40,
  imageURI = placeholder,
  className = "",
  imageLayoutID,
  loading,
  onClick,
}: ProfilePictureProps) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [imageURI]);

  return (
    <motion.div
      className={twMerge(
        "object-cover rounded-full overflow-hidden transition-shadow shadow-lg active:shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        className,
      )}
      onClick={onClick}
      whileTap={{ scale: onClick ? 0.99 : 1 }}
      whileHover={{ scale: onClick ? 1.02 : 1 }}
      style={{ width: size, height: size }}
    >
      {loading ? (
        <Skeleton className="h-full w-full rounded-full border-2 border-background-primary/40" />
      ) : (
        !imageError &&
        imageURI && (
          <motion.img
            className="h-full w-full object-cover rounded-full border-2 border-background-primary/40"
            src={imageURI}
            alt="Profile Picture"
            layoutId={imageLayoutID}
            onError={() => setImageError(true)}
          />
        )
      )}
    </motion.div>
  );
};
