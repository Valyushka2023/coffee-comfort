module.exports = {
  input: ['src/**/*.{js,jsx,ts,tsx}'],
  // Тепер exclude не потрібен, бо файли _old просто не будуть створюватися
  output: 'src/locales/$LOCALE/$NAMESPACE.json',

  locales: ['uk', 'en'],

  // 1. ВИДАЛЯЄМО зайві файли-дублікати
  createOldFiles: false,

  // 2. ВИДАЛЯЄМО ключі, яких немає в коді
  keepRemoved: false,

  sort: true,
  defaultValue: (locale, namespace, key) => {
    return locale === 'uk' ? '' : `[TODO: ${key}]`;
  },
};
