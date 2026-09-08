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
        'signals-berlin-agent-skill-drift': resolve(import.meta.dirname, 'talks/2026/2026-09-11-signals-berlin-agent-skill-drift/index.html'),
        'code-europe-i-know-otel': resolve(import.meta.dirname, 'talks/2026/2026-09-15-code-europe-i-know-otel/index.html'),
      },
    },
  },
});
