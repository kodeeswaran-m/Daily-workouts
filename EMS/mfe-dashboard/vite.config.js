import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mfe_dashboard", 
      filename: "remoteEntry.js", 
      exposes: {
        "./StatsCard":"./src/components/StatsCard"
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false },
      },
    }),
  ],
  server: { port: 3002 },
  preview: { port: 3002, strictPort: true },
});
