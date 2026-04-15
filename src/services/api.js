import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  console.error('⚠️ ПОМИЛКА: VITE_API_URL не задано у налаштуваннях Vercel!');
}
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const ENDPOINTS = {
  BOOKINGS: '/bookings',
  REVIEWS: '/reviews',
  CALLBACKS: '/callbacks',
  MENU: '/menu',
};

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
