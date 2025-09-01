// mfe-remote1/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote1",
      filename: "remoteEntry.js",
      exposes: {
        "./ProductList": "./src/ProductList.jsx",
      },
      remotes: {
        mfe_host: "http://localhost:4175/assets/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false },
        "react-redux": { singleton: true, requiredVersion: false },
        "@reduxjs/toolkit": { singleton: true, requiredVersion: false },
      },
    }),
  ],
  server: { port: 4174 },
  build: { target: "esnext" },
});
