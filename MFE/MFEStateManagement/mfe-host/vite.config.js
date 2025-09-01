// mfe-host/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mfe_host",
      filename: "remoteEntry.js",           // host must be a remote too (so others can import it)
      exposes: {
        "./store": "./src/store/index.jsx", // expose ONLY the store (thunks re-exported from here)
      },
      remotes: {
        remote: "http://localhost:4173/assets/remoteEntry.js",
        remote1: "http://localhost:4174/assets/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false },
        "react-redux": { singleton: true, requiredVersion: false },
        "@reduxjs/toolkit": { singleton: true, requiredVersion: false },
        "react-router-dom": { singleton: true, requiredVersion: false },
      },
    }),
  ],
  server: { port: 4175 },
  build: { target: "esnext" },
});
