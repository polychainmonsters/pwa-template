import childProcess from "child_process";
import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { VitePWA } from "vite-plugin-pwa";
import { qrcode } from "vite-plugin-qrcode";
import basicSsl from "@vitejs/plugin-basic-ssl";

import react from "@vitejs/plugin-react";

let faviconURL = "/favicon.ico";

const revision = childProcess.execSync("git rev-parse HEAD").toString().trim();

export default defineConfig({
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  plugins: [
    nodePolyfills(),
    qrcode(),
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          revision,
        },
      },
    }),
    VitePWA({
      strategies: "injectManifest",
      injectRegister: null,
      injectManifest: {
        maximumFileSizeToCacheInBytes: 4000000,
      },
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "index.html",
      },
      includeAssets: [faviconURL],
      manifest: {
        name: "PWA Template",
        short_name: "Template",
        description: "PWA Template for web3.",
        theme_color: "#FFF",
        background_color: "#FFF",
        orientation: "portrait",
        display: "standalone",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        sourcemap: true,
      },
    }),
    basicSsl(),
  ],
});
