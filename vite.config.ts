import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@constant': path.resolve(__dirname, './src/constant'),
      '@url': path.resolve(__dirname, './src/components/url'),
      '@reduxToolkit': path.resolve(__dirname, './src/components/reduxToolkit'),
      '@reusableComponents': path.resolve(__dirname, './src/reusableComponents'),
    },
  },
})
