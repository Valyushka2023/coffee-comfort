import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/bookings': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      '/campers': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
  // ===================================
  // НОВИЙ БЛОК ДЛЯ ТЕСТУВАННЯ (VITEST)
  // ===================================
  test: {
    globals: true, // Дозволяє використовувати глобальні функції, як-от `describe`, `it`, `expect`
    environment: 'jsdom', // Використовує JSDOM для імітації DOM-середовища браузера
    setupFiles: './src/setupTests.js', // Шлях до файлу налаштування тестів (якщо він є)
  },
});
