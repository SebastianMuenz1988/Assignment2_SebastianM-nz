import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


//Include the backend so that it can be reached writing fetch(‘/api/rest-route’) 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://cinema-rest.nodehill.se',
        changeOrigin: true,
        secure: true
      }
    }
  }
})
