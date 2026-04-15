const isBrowser = typeof window !== 'undefined';

const getLogLevel = () => {
  // 1. Якщо ми в браузері (Vite)
  if (isBrowser) {
    try {
      // Використовуємо рядок для доступу, щоб Node.js не аналізував це
      return import.meta.env?.VITE_LOG_LEVEL || 'info';
    } catch {
      return 'info';
    }
  }

  // 2. Якщо ми на сервері (Node.js)
  try {
    return process.env?.VITE_LOG_LEVEL || 'info';
  } catch {
    return 'info';
  }
};

const LOG_LEVEL = getLogLevel();

const logger = {
  info: (msg, ...args) =>
    LOG_LEVEL === 'info' && console.log(`ℹ️ [INFO]: ${msg}`, ...args),
  error: (msg, ...args) => console.error(`❌ [ERROR]: ${msg}`, ...args),
};

export default logger;
