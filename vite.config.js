import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Keep React plugin
    viteCompression({ 
      algorithm: 'brotliCompress', // Use Brotli or 'gzip' if preferred
      threshold: 1024 // Only compress files larger than 1KB
    }),
  ],
});
