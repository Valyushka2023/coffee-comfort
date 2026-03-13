// import axios from 'axios';

// const BACKEND_BASE_URL =
//   import.meta.env.VITE_API_URL || 'http://localhost:5001';

// const api = axios.create({
//   baseURL: BACKEND_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// const ENDPOINTS = {
//   BOOKINGS: '/api/bookings',
//   REVIEWS: '/api/reviews',
//   CALLBACKS: '/api/callbacks',
// };

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
import axios from 'axios';

/**
 * Оновлений підхід до базового URL:
 * Vercel автоматично задає змінну VITE_API_URL, але для
 * Serverless-архітектури найкраще використовувати відносні шляхи.
 */
const getBaseUrl = () => {
  // Перевіряємо, чи ми на Vercel (Vercel автоматично додає VERCEL=1)
  // або перевіряємо режим збірки Vite.
  const isProduction = import.meta.env.MODE === 'production';

  if (isProduction) {
    return ''; // Запити йдуть на поточний домен (наприклад, /api/menu)
  }

  // Локальна розробка
  return import.meta.env.VITE_API_URL || 'http://localhost:5001';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Додаємо інтерцептор, щоб бачити, куди саме йде запит (для дебагу в консолі)
api.interceptors.request.use(config => {
  console.log(`🚀 Sending request to: ${config.baseURL}${config.url}`);
  return config;
});

const ENDPOINTS = {
  BOOKINGS: '/api/bookings',
  REVIEWS: '/api/reviews',
  CALLBACKS: '/api/callbacks',
  MENU: '/api/menu',
};

// ... решта вашого коду без змін ...

const handleError = (error, defaultMessage) => {
  const message = error.response?.data?.message || defaultMessage;
  throw new Error(message);
};

export const sendBookingRequest = async bookingData => {
  try {
    const { data } = await api.post(ENDPOINTS.BOOKINGS, bookingData);
    return data;
  } catch (error) {
    handleError(error, 'Помилка бронювання');
  }
};

export const sendCallbackRequest = async callbackData => {
  try {
    const { data } = await api.post(ENDPOINTS.CALLBACKS, callbackData);
    return data;
  } catch (error) {
    handleError(error, 'Помилка замовлення дзвінка');
  }
};

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
    console.error('❌ API Error (Fetch Reviews):', error);
    handleError(error, 'Помилка завантаження відгуків');
  }
};

export const fetchMenuRequest = async () => {
  try {
    const { data } = await api.get(ENDPOINTS.MENU);
    return data;
  } catch (error) {
    console.error('❌ API Error (Fetch Menu):', error);
    handleError(error, 'Помилка завантаження меню');
  }
};
