import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression' // 🔥 1. Importamos el plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 🔥 2. Lo añadimos a la lista de plugins
    viteCompression({
      algorithm: 'gzip', // Comprime usando el algoritmo estándar que leen todos los móviles
      ext: '.gz',        // Añade la extensión .gz a los archivos comprimidos
    })
  ],
})