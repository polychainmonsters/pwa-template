import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { logError } from "./errorHandler.ts";

window.onerror = function (message, source, lineno, colno, error) {
  logError(new Error(message as string));
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
