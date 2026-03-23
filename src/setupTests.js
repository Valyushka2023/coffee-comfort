// import 'vitest-dom/extend-expect';
// import '@testing-library/jest-dom';
// import { vi } from 'vitest';

// // Оновлений мок для i18next
// vi.mock('react-i18next', () => ({
//   useTranslation: () => ({
//     t: key => {
//       // Словник "ключ: значення" для тестів
//       const translations = {
//         submit_btn: 'Send',
//         title: 'Coffee Comfort',
//         name_label: 'Name',
//         email_label: 'Email',
//         phone_label: 'Phone',
//         send: 'Send', // Додайте сюди 'send', якщо тест його шукає
//       };
//       return translations[key] || key;
//     },
//     i18n: {
//       changeLanguage: () => new Promise(() => {}),
//       language: 'en',
//     },
//   }),
//   initReactI18next: {
//     type: '3rdParty',
//     init: () => {},
//   },
// }));
import 'vitest-dom/extend-expect';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Глобальний мок для i18next для всіх тестів
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => {
      // Наш словник для тестів
      const translations = {
        title: 'Coffee Comfort',
        submit_btn: 'Send',
        send: 'Send',
        name_label: 'Name',
        email_label: 'Email',
        phone_label: 'Phone',
        date_label: 'Date',
        comment_label: 'Comment',
        choose_atmosphere: 'Choose atmosphere',
      };
      return translations[key] || key;
    },
    i18n: {
      changeLanguage: () => new Promise(() => {}),
      language: 'en',
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));
