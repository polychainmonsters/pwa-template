import { useRouteError } from "react-router-dom";

import { useEffect } from "react";
import { logError } from "../../errorHandler.ts";

interface RouteError {
  statusText?: string;
  message?: string;
}

export const PageError = () => {
  const error = useRouteError() as RouteError;

  useEffect(() => {
    if (error) {
      logError(error as Error);
    }
  }, [error]);

  return (
    <div className="flex flex-1 flex-col py-safe-or-4">
      <div className="flex flex-1 flex-col justify-center items-center">
        <img alt="Error" src="" className="w-3/4 aspect-square" />
        <div className="flex flex-col text-center space-y-2 p-4">
          <h1 className="font-display font-black text-2xl text-text-primary">
            Whoa, a Wild Glitch!
          </h1>
          <p className="text-sm text-text-secondary">
            Seems you've stumbled upon a rare anomaly in the template. Our devs
            are on it!
          </p>
          <i className="text-xs text-text-error">
            {error.statusText || error.message}
          </i>
        </div>
      </div>
    </div>
  );
};
