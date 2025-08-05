import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    include: ['src/**/*.{test,spec}.{js,ts,vue}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'src/**/*.js',
        'src/**/*.vue',
      ],
      exclude: [
        'node_modules/',
        '.vscode',
        'dist',
        'src/test/',
        'src/shared/utils/mock.js',
        'src/shared/components/ui/index.js',
        'src/App.vue',
        'src/main.js',
        'src/layouts/',
        '**/*.d.ts',
        '**/*.test.{ts,js,mjs}',
        '**/*.config.{ts,js,mjs}',
        '**/router/**',
        '**/store/**',
        '**/stores/**',
        '**/__test__/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
      '@ui': fileURLToPath(new URL('./src/shared/components/ui/index.js', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/shared/utils', import.meta.url)),
      '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '@test': fileURLToPath(new URL('./src/test', import.meta.url)),
    },
  },
});
