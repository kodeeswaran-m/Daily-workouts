import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'container',
      remotes: {
        mfe_auth: 'http://localhost:3001/remoteEntry.js',
        mfe_dashboard: 'http://localhost:3002/remoteEntry.js',
        mfe_departments: 'http://localhost:3003/remoteEntry.js',
        mfe_employees: 'http://localhost:3004/remoteEntry.js',

      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        'react-dom': { singleton: true, requiredVersion: false }
      }
    })
  ],
  server: { port: 3000 },
  preview:{port:3000,strictPort:true}
})
