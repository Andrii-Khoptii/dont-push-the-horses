import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@ui': path.resolve(__dirname, './src/shared/components/ui'),
      '@utils': path.resolve(__dirname, './src/shared/utils'),
      '@features': path.resolve(__dirname, './src/features'),

    },
  },
  plugins: [vue(), tailwindcss()],
});
