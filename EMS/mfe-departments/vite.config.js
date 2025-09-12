import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mfe_departments", 
      filename: "remoteEntry.js", 
      exposes: {
        "./DepartmentTable":"./src/components/DepartmentTable"
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false },
      },
    }),
  ],
  server: { port: 3003 },
  preview: { port: 3003, strictPort: true },
});
