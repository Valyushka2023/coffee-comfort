import { setupServer } from './server.js';
import { initMongoDB } from './db/initMongoDB.js';

const bootstrap = async () => {
  try {
    await initMongoDB();

    setupServer();
  } catch {
    // Ігноруємо помилку, бо вона не критична}
  }
};

bootstrap();
