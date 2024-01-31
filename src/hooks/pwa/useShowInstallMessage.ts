import { useEffect, useMemo, useState } from "react";

const PWA_LOCAL_STORAGE_KEY = "pwa";

export const useShowInstallMessage = () => {
  const [showInstallMessage, setShowInstallMessage] = useState(false);

  const isInStandaloneMode = useMemo(
    () =>
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in window.navigator && window.navigator.standalone),
    [],
  );

  const isMobile = useMemo(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod|android/.test(userAgent);
  }, []);

  // Check if "pwa=1" is set in the query parameters
  const hasPwaQueryParam = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get(PWA_LOCAL_STORAGE_KEY) === "1";
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get(PWA_LOCAL_STORAGE_KEY) === "1") {
      localStorage.setItem(PWA_LOCAL_STORAGE_KEY, "1");
    }
  }, []);

  useEffect(() => {
    const isInStandaloneOnIos = isMobile && isInStandaloneMode;

    if (!isInStandaloneOnIos && !localStorage.getItem(PWA_LOCAL_STORAGE_KEY)) {
      setShowInstallMessage(true);
    }
  }, [isMobile, isInStandaloneMode, hasPwaQueryParam]);

  return { showInstallMessage };
};
