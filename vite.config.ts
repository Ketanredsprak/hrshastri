import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': `${rootDir}/src`,
    },
  },
  build: {
    target: 'es2022',
    cssMinify: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/hrshashtri_web',
        changeOrigin: true,
      },
    },
  },
})
