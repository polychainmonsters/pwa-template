import { useEffect } from "react";

/**
 * Custom hook to lock the screen orientation to portrait mode.
 * This hook uses the Screen Orientation API, which might not be supported by all browsers.
 */
export const useLockOrientation = () => {
  useEffect(() => {
    // Extended ScreenOrientation interface to include the lock method.
    // This ensures type safety, as the standard ScreenOrientation type might not include the lock method.
    interface ExtendedScreenOrientation extends ScreenOrientation {
      lock(orientation: "portrait"): Promise<void>;
    }

    // Check if the Screen Orientation API is available and if it supports the 'lock' method.
    if (screen.orientation && "lock" in screen.orientation) {
      // Attempt to lock the screen to portrait mode.
      (screen.orientation as ExtendedScreenOrientation)
        .lock("portrait")
        .then(() => {
          console.log("Screen locked in portrait mode!");
        })
        .catch((error) => {
          console.error("Failed to lock screen:", error);
        });
    }
  }, []); // Empty dependency array ensures the effect runs only once (similar to componentDidMount).
};
