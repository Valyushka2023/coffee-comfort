// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';

// import bookingRouters from './src/routes/bookingRouters.js';
// import reviewRouters from './src/routes/reviewsRouters.js'; // Імпортовано як reviewRouters
// import menuRouters from './src/routes/menuRouters.js';
// import callbackRouters from './src/routes/callbackRouters.js';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5001;
// // Використовуємо port тільки якщо ми не на Vercel (локально)
// if (process.env.NODE_ENV !== 'production') {
//   app.listen(port, () => {
//     console.log(`🚀 Server running on http://localhost:${port}`);
//   });
// }
// // --- CORS налаштування ---
// // app.use(
// //   cors({
// //     origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
// //     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// //     allowedHeaders: ['Content-Type', 'Authorization'],
// //     credentials: true,
// //   })
// // );
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Отримуємо список дозволених адрес зі змінної
//       const allowedOrigins = process.env.CORS_ORIGIN.split(',');

//       // Дозволяємо запит, якщо origin немає (наприклад, через Postman)
//       // або якщо він є у нашому списку
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//   })
// );
// app.use(express.json());

// // --- МАРШРУТИ ---
// app.use('/api/bookings', bookingRouters);

// // ВИПРАВЛЕНО: Використовуємо саме ту назву, яку вказали при імпорті (reviewRouters)
// app.use('/api/reviews', reviewRouters);

// app.use('/api/menu', menuRouters);

// app.use('/api/callbacks', callbackRouters);

// // Додатково: Обробка неіснуючих маршрутів (допоможе відловити 404 помилки)
// app.use((req, res) => {
//   res
//     .status(404)
//     .json({ message: `Маршрут ${req.originalUrl} не знайдено на сервері` });
// });

// // --- ПІДКЛЮЧЕННЯ ДО БД ---
// // На Vercel ми не викликаємо app.listen!
// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(() => {
//     console.log('✅ Connected to MongoDB');
//   })
//   .catch(err => {
//     console.error('❌ MongoDB connection error:', err);
//   });

// export default app;
/***/
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import bookingRouters from './src/routes/bookingRouters.js';
import reviewRouters from './src/routes/reviewsRouters.js';
import menuRouters from './src/routes/menuRouters.js';
import callbackRouters from './src/routes/callbackRouters.js';

dotenv.config();

const app = express();

// --- CORS налаштування ---
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Якщо змінна пуста, дозволяємо всім (або задаємо дефолтний localhost)
//       const allowedOrigins = process.env.CORS_ORIGIN
//         ? process.env.CORS_ORIGIN.split(',')
//         : ['http://localhost:5173'];

//       // !origin — це запити, які не передають заголовок Origin (наприклад, сервер-сервер)
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//   })
// );
app.use(cors());
app.use(express.json());

// --- МАРШРУТИ ---
app.use('/api/bookings', bookingRouters);
app.use('/api/reviews', reviewRouters);
app.use('/api/menu', menuRouters);
app.use('/api/callbacks', callbackRouters);

// Обробка 404
app.use((req, res) => {
  res.status(404).json({ message: `Маршрут ${req.originalUrl} не знайдено` });
});

// --- ПІДКЛЮЧЕННЯ ДО БД ---
mongoose
  .connect(process.env.MONGODB_URL || process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --- СЕРВЕР ---
// const port = process.env.PORT || 5001;
// if (process.env.NODE_ENV !== 'production' || process.env.RENDER) {
//   app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
// }
const port = process.env.PORT || 10000; // Render любить порт 10000
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));

export default app;
