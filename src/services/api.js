import axios from 'axios';

// --- Оновлений базовий URL ---
// Тепер береться виключно зі змінних середовища (VITE_API_URL на Vercel)
const BASE_URL = import.meta.env.VITE_API_URL;

// Перевірка на випадок, якщо ви забули додати змінну на Vercel
if (!BASE_URL) {
  console.error('⚠️ ПОМИЛКА: VITE_API_URL не задано у налаштуваннях Vercel!');
}

// створюємо axios instance
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// endpoints
const ENDPOINTS = {
  BOOKINGS: '/bookings',
  REVIEWS: '/reviews',
  CALLBACKS: '/callbacks',
  MENU: '/menu',
};

// --- Обробка помилок ---
const handleError = (error, defaultMessage) => {
  console.error('API Error:', error);

  const message =
    error.response?.data?.message || error.message || defaultMessage;

  throw new Error(message);
};

// ======================
// BOOKINGS
// ======================
export const sendBookingRequest = async bookingData => {
  try {
    const { data } = await api.post(ENDPOINTS.BOOKINGS, bookingData);
    return data;
  } catch (error) {
    handleError(error, 'Помилка бронювання');
  }
};

// ======================
// CALLBACK
// ======================
export const sendCallbackRequest = async callbackData => {
  try {
    const { data } = await api.post(ENDPOINTS.CALLBACKS, callbackData);
    return data;
  } catch (error) {
    handleError(error, 'Помилка замовлення дзвінка');
  }
};

// ======================
// REVIEWS
// ======================
export const sendReviewRequest = async reviewData => {
  try {
    const { data } = await api.post(ENDPOINTS.REVIEWS, reviewData);
    return data;
  } catch (error) {
    handleError(error, 'Помилка відправки відгуку');
  }
};

export const fetchReviewsRequest = async () => {
  try {
    const { data } = await api.get(ENDPOINTS.REVIEWS);
    return data;
  } catch (error) {
    handleError(error, 'Помилка завантаження відгуків');
  }
};

// ======================
// MENU
// ======================
export const fetchMenuRequest = async () => {
  try {
    const { data } = await api.get(ENDPOINTS.MENU);
    return data;
  } catch (error) {
    handleError(error, 'Помилка завантаження меню');
  }
};
// import axios from 'axios';

// const getBaseUrl = () => {
//   return import.meta.env.MODE === 'production' ? '' : 'http://localhost:5001';
// };

// // ТЕПЕР МИ ВИКОРИСТОВУЄМО ФУНКЦІЮ getBaseUrl()
// const api = axios.create({
//   baseURL: getBaseUrl(),
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
// // Додаємо інтерцептор, щоб бачити, куди саме йде запит (для дебагу в консолі)
// api.interceptors.request.use(config => {
//   console.log(`🚀 Sending request to: ${config.baseURL}${config.url}`);
//   return config;
// });

// const ENDPOINTS = {
//   BOOKINGS: '/api/bookings',
//   REVIEWS: '/api/reviews',
//   CALLBACKS: '/api/callbacks',
//   MENU: '/api/menu',
// };

// // ... решта вашого коду без змін ...

// const handleError = (error, defaultMessage) => {
//   const message = error.response?.data?.message || defaultMessage;
//   throw new Error(message);
// };

// export const sendBookingRequest = async bookingData => {
//   try {
//     const { data } = await api.post(ENDPOINTS.BOOKINGS, bookingData);
//     return data;
//   } catch (error) {
//     handleError(error, 'Помилка бронювання');
//   }
// };

// export const sendCallbackRequest = async callbackData => {
//   try {
//     const { data } = await api.post(ENDPOINTS.CALLBACKS, callbackData);
//     return data;
//   } catch (error) {
//     handleError(error, 'Помилка замовлення дзвінка');
//   }
// };

// export const sendReviewRequest = async reviewData => {
//   try {
//     const { data } = await api.post(ENDPOINTS.REVIEWS, reviewData);
//     return data;
//   } catch (error) {
//     handleError(error, 'Помилка відправки відгуку');
//   }
// };

// export const fetchReviewsRequest = async () => {
//   try {
//     const { data } = await api.get(ENDPOINTS.REVIEWS);
//     return data;
//   } catch (error) {
//     console.error('❌ API Error (Fetch Reviews):', error);
//     handleError(error, 'Помилка завантаження відгуків');
//   }
// };

// export const fetchMenuRequest = async () => {
//   try {
//     const { data } = await api.get(ENDPOINTS.MENU);
//     return data;
//   } catch (error) {
//     console.error('❌ API Error (Fetch Menu):', error);
//     handleError(error, 'Помилка завантаження меню');
//   }
// };
