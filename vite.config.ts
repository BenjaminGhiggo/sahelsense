import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          leaflet: ['leaflet', 'react-leaflet'],
          plotly: ['plotly.js-dist-min', 'react-plotly.js'],
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
});