import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://zany-yodel-5v4ppgr9pv4fv5vg-8000.app.github.dev',
        changeOrigin: true,
      }
    }
  }
})
