import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mfe_remote2", // unique name for this remote
      filename: "remoteEntry.js", // generated federated manifest
      exposes: {
        // what this remote exposes
        "./Widget": "./src/Widget.jsx",
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false },
        "react-router-dom": { singleton: true, requiredVersion: false },
        "@mui/material": { singleton: true, eager: true },
        "@emotion/react": { singleton: true, eager: true },
        "@emotion/styled": { singleton: true, eager: true },
      },
    }),
  ],
  server: { port: 4174 },
});
