import axios from 'axios';

// Переконайся, що в .env VITE_API_URL=http://localhost:5001
const BACKEND_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5001';

const ENDPOINTS = {
  BOOKINGS: '/api/bookings', // Додано /api
  REVIEWS: '/api/reviews',
};

export const sendBookingRequest = async bookingData => {
  try {
    const url = `${BACKEND_BASE_URL}${ENDPOINTS.BOOKINGS}`;
    console.log('🚀 Відправка на URL:', url);

    const response = await axios.post(url, bookingData, {
      headers: { 'Content-Type': 'application/json' },
    });

    return response.data;
  } catch (error) {
    console.error(
      '❌ API Error (Booking):',
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || 'Server connection error');
  }
};
/***********************/
// import axios from 'axios';

// const BACKEND_BASE_URL =
//   import.meta.env.VITE_API_URL || 'http://localhost:5001';

// export const sendBookingRequest = async bookingData => {
//   try {
//     const response = await axios.post(
//       `${BACKEND_BASE_URL}/bookings`,
//       bookingData,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     // Логуємо помилку для розробника
//     console.error('API Error:', error.response?.data || error.message);

//     // ВАЖЛИВО: викидаємо помилку далі.
//     // Якщо цього не зробити, React-компонент подумає, що все добре.
//     throw error;
//   }
// };
// import axios from 'axios';

// const BOOKINGS_ENDPOINT = '/bookings';
// const BACKEND_BASE_URL = import.meta.env.VITE_API_URL;

// // =========================================================================
// // ✅ Отримати список усіх кемперів (з optional фільтрами та мовою)
// // =========================================================================
// export const fetchCampers = async (params = {}, lang = 'en') => {
//   try {
//     // 💥 ЗМІНА: Додаємо мову до всіх параметрів запиту
//     const allParams = { ...params, lang };

//     const searchParams = new URLSearchParams(allParams).toString();
//     const url = searchParams
//       ? `${BACKEND_BASE_URL}/campers?${searchParams}`
//       : `${BACKEND_BASE_URL}/campers`;

//     const response = await axios.get(url);

//     // console.log(`GET request to ${url} succeeded. Status: ${response.status}`);
//     // console.log('Response data:', response.data);

//     if (response.status !== 200) return [];

//     const data = response.data;

//     // Повертаємо масив кемперів
//     if (Array.isArray(data)) return data;
//     if (data?.items && Array.isArray(data.items)) return data.items;

//     return [];
//   } catch (error) {
//     // console.error(`Error fetching campers: ${error.message}`);
//     if (error.response) {
//       // console.error('Status:', error.response.status);
//       // console.error('Data:', error.response.data);
//     }
//     return [];
//   }
// };

// // =========================================================================
// // ✅ Отримати одного кемпера за ID (з параметром мови)
// // =========================================================================
// export const fetchCamperById = async (id, lang = 'en') => {
//   // 💥 ЗМІНА: Додаємо параметр lang
//   try {
//     if (!id) return null;

//     // 💥 ЗМІНА: Додаємо параметр мови до URL
//     const url = `${BACKEND_BASE_URL}/campers/${id}?lang=${lang}`;

//     // console.log(`Sending GET request to: ${url}`);

//     const response = await axios.get(url);

//     // console.log(`GET request to ${url} succeeded. Status: ${response.status}`);
//     // console.log('Response data:', response.data);

//     if (response.status === 200) {
//       return response.data;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     // console.error(`Error fetching camper by ID: ${error.message}`);
//     if (error.response) {
//       // console.error('Status:', error.response.status);
//       // console.error('Data:', error.response.data);
//     }
//     return null;
//   }
// };

// // =========================================================================
// // ✅ Надіслати відгук
// // =========================================================================
// export const sendReview = async reviewData => {
//   try {
//     const { camperId, ...reviewFields } = reviewData;

//     if (!camperId) return null;

//     const url = `${BACKEND_BASE_URL}/campers/${camperId}/reviews`;

//     const response = await axios.post(url, reviewFields, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.status === 201) {
//       return response.data;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     // console.error(`Error sending review: ${error.message}`);
//     if (error.response) {
//       // console.error('Status:', error.response.status);
//       // console.error('Data:', error.response.data);
//     }
//     return null;
//   }
// };

// // =========================================================================
// // ✅ Надіслати запит на бронювання
// // =========================================================================
// export const sendBookingRequest = async bookingData => {
//   try {
//     const url = `${BACKEND_BASE_URL}${BOOKINGS_ENDPOINT}`;

//     const response = await axios.post(url, bookingData, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     return response.data;
//   } catch (error) {
//     // console.error(`Error sending booking request: ${error.message}`);
//     return {
//       success: false,
//       message: error.message || 'Failed to connect to the server.',
//     };
//   }
// };
