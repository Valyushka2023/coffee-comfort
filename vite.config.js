import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Оскільки ми використовуємо повні шляхи або baseURL в axios,
  // проксі тут більше не потрібен.
});
