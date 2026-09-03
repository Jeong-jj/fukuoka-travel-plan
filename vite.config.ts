import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
export default defineConfig({
  base: process.env.PAGES_BASE_PATH ?? '/',
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [react()],
});
