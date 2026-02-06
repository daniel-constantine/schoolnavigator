import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/',
        '*.config.js',
        'main.jsx',
        'index.html',
        'server.js',
        'dist/'
      ],
      include: [
        'utils.js',
        'filterUtils.js',
        'filterUtils-optimized.js',
        'api.js',
        'constants.js',
        'components/**/*.{js,jsx}'
      ],
      all: true,
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});