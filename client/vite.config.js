import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// En desarrollo, /api y /products se redirigen al backend (puerto 5000).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000',
      '/products': 'http://localhost:5000',
    },
  },
});
