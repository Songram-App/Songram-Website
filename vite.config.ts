import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Development server configuration
  server: {
    historyApiFallback: true,
  },
  
  // Preview server configuration
  preview: {
    historyApiFallback: true,
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Ensure proper handling of client-side routing
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}); 