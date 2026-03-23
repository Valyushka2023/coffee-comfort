import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Додаємо блок test для налаштування середовища Vitest
  test: {
    globals: true, // Дозволяє використовувати describe, it, expect без імпорту
    environment: 'jsdom', // Це саме те налаштування, яке вирішує помилку 'document is not defined'
    setupFiles: './src/setupTests.js', // Шлях до файлу налаштувань (якщо ви його створите)
  },
});
