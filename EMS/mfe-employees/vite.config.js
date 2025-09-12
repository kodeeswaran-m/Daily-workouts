import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mfe_employees", 
      filename: "remoteEntry.js", 
      exposes: {
        "./EmployeeTable":"./src/components/EmployeeTable"
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false },
      },
    }),
  ],
  server: { port: 3004 },
  preview: { port: 3004, strictPort: true },
});
