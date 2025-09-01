import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mfe_host",
      remotes: {
        // mfe_remote1: "http://localhost:4173/remoteEntry.js",
        // mfe_remote2: "http://localhost:4174/remoteEntry.js",
        mfe_remote1: "http://localhost:4173/assets/remoteEntry.js",
        mfe_remote2: "http://localhost:4174/assets/remoteEntry.js",
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
  server: { port: 3000 },
});
