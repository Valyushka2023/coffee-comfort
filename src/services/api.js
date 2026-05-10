import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  console.error('⚠️ ERROR: VITE_API_URL is not set in Vercel settings!');
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
  ORDERS: '/orders',
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
    handleError(error, 'Booking error');
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
    handleError(error, 'Call order error');
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
    handleError(error, 'Error sending feedback');
  }
};

export const fetchReviewsRequest = async () => {
  try {
    const { data } = await api.get(ENDPOINTS.REVIEWS);
    return data;
  } catch (error) {
    handleError(error, 'Error loading reviews');
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
    handleError(error, 'Error loading menu');
  }
};

// ======================
// ORDERS
// ======================
export const sendOrderRequest = async orderData => {
  try {
    const { data } = await api.post(ENDPOINTS.ORDERS, orderData);
    return data;
  } catch (error) {
    handleError(error, 'Error creating order');
  }
};

export const fetchOrdersRequest = async () => {
  try {
    const { data } = await api.get(ENDPOINTS.ORDERS);
    return data;
  } catch (error) {
    handleError(error, 'Error loading orders');
  }
};

// ДОДАЙТЕ ЦЕЙ МЕТОД СЮДИ:
export const updateOrderStatus = async (orderId, updates) => {
  try {
    // Використовуємо api (з уже налаштованим baseURL) та ENDPOINTS.ORDERS
    const { data } = await api.patch(`${ENDPOINTS.ORDERS}/${orderId}`, updates);
    return data;
  } catch (error) {
    handleError(error, 'Error updating order status');
  }
};
// ======================
// HISTORY
// ======================
export const fetchOrderHistoryRequest = async () => {
  try {
    // Звертаємося до /orders/history
    const { data } = await api.get(`${ENDPOINTS.ORDERS}/history`);
    return data;
  } catch (error) {
    handleError(error, 'Error loading order history');
  }
};
