import { useEffect, useState } from "react";

interface MSWindow extends Window {
  MSStream: MSWindow;
}

type OperatingSystem = "iOS" | "Android" | "unknown";

function determineOperatingSystem(): OperatingSystem {
  const userAgent = navigator.userAgent || navigator.vendor;

  if (/windows phone/i.test(userAgent)) {
    return "unknown";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // Cast window to MSWindow to avoid TypeScript error
  const msWindow = window as unknown as MSWindow;
  if (/iPad|iPhone|iPod/.test(userAgent) && !msWindow.MSStream) {
    return "iOS";
  }

  return "unknown";
}

export function useOperatingSystem() {
  const [os, setOs] = useState<OperatingSystem>("unknown");

  useEffect(() => {
    setOs(determineOperatingSystem());
  }, []);

  const isIOS = os === "iOS";
  const isAndroid = os === "Android";

  return { os, isIOS, isAndroid };
}
