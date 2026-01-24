import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './test/setup.ts',
    include: ['__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    alias: {
      '@': path.resolve(__dirname, './'),
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'test/',
        'scripts/',
        '**/*.d.ts',
        '**/*.config.*',
        '.next/',
      ],
    },
    // Fix for ESM/CJS conflict in jsdom dependencies
    server: {
      deps: {
        inline: [/html-encoding-sniffer/, /@exodus\/bytes/],
      },
    },
  },
});
