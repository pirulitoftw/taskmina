import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Asegurar que el servidor de desarrollo funcione correctamente
  server: {
    open: true, // Abre automáticamente el navegador
    hmr: {
      overlay: true, // Muestra errores como overlay
    },
  },
  
  // Asegurar que las rutas base sean consistentes entre dev y preview
  base: './',
});
