import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import path from 'path';

// 1. Importamos las herramientas nativas de Node para el 'antídoto'
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

// 2. Creamos nuestro propio 'require' para esquivar el bug del plugin
const require = createRequire(import.meta.url);
const vitePrerender = require('vite-plugin-prerender');

// 3. Recreamos la variable '__dirname' para que funcione en entornos modernos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: [
        '/', 
        '/disenoweb', 
        '/e-commerce', 
        '/posicionamiento-seo', 
        '/redes-sociales', 
        '/nosotros', 
        '/contacto'
      ], 
    })
  ],
});