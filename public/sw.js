// public/sw.js

import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { NavigationRoute, registerRoute } from "workbox-routing";

import { NetworkFirst } from "workbox-strategies";

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

// Clean up old caches
self.addEventListener("activate", () => {
  cleanupOutdatedCaches();
  clientsClaim(); // Take immediate control of the clients.
});

// Install event
self.addEventListener("install", () => {
  self.skipWaiting(); // Force the waiting service worker to become the active service worker
});

let allowlist;
if (import.meta.env.DEV) {
  allowlist = [/^\/$/];
}

// to allow work offline
registerRoute(
  new NavigationRoute(createHandlerBoundToURL("index.html"), { allowlist }),
  new NetworkFirst({
    networkTimeoutSeconds: 60,
  }),
);

addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
    clientsClaim();
    event.ports[0].postMessage("Done");
  }
});
