import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, 'index.html'),
        templates: resolve(import.meta.dirname, 'templates.html'),
        'otel-mistakes': resolve(import.meta.dirname, 'talks/2026/2026-07-09-wearedevelopers-otel-mistakes/index.html'),
      },
    },
  },
});
