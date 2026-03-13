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

// Визначаємо базовий URL:
// Якщо ми в режимі розробки ('development'), використовуємо localhost.
// Якщо ми в режимі 'production' (на Vercel), використовуємо порожній рядок,
// щоб запити йшли до того ж домену, де лежить сайт.
const BACKEND_BASE_URL =
  import.meta.env.MODE === 'production'
    ? ''
    : import.meta.env.VITE_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const ENDPOINTS = {
  BOOKINGS: '/api/bookings',
  REVIEWS: '/api/reviews',
  CALLBACKS: '/api/callbacks',
  MENU: '/api/menu',
};

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
