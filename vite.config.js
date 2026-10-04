import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

// El prerenderizado se hace después del build con scripts/prerender.mjs
// (Puppeteer), que también regenera los .gz de los HTML que reescribe.

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
});
