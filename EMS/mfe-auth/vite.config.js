import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import LoginForm from "./src/components/LoginForm";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mfe_auth", 
      filename: "remoteEntry.js", 
      exposes: {
        "./LoginForm":"./src/components/LoginForm"
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false },
      },
    }),
  ],
  server: { port: 3001 },
  preview: { port: 3001, strictPort: true },
});
