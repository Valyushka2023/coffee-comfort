import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bookingRouters from './src/routes/bookingRouters.js';
import menuRouters from './src/routes/menuRouters.js'; // Імпортуємо новий роутер меню
import campersRouters from './src/routes/campersRouters.js';

dotenv.config();

const app = express();

// Налаштування CORS
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.options('*', cors());
app.use(express.json());

// ПІДКЛЮЧЕННЯ РОУТЕРІВ
// Тепер кожен роутер відповідає за свій шлях
app.use('/api/bookings', bookingRouters);
app.use('/api/menu', menuRouters); // Запити на меню тепер йдуть сюди
app.use('/api', campersRouters);

const port = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(port, () =>
      console.log(`🚀 Сервер запущено на http://localhost:${port}`)
    );
  })
  .catch(err => console.error('❌ Помилка БД:', err));

/********************/
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import bookingRouters from './src/routes/bookingRouters.js';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5001;

// // --- CORS ---
// app.use(
//   cors({
//     // Дозволяємо запити з вашого фронтенду (порт 5173)
//     origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//   })
// );

// app.use(express.json());

// // --- Маршрути ---
// // Використовуємо роутер без префікса, бо '/bookings' уже є всередині роутера
// app.use(bookingRouters);

// // --- Підключення MongoDB ---
// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(() => {
//     console.log('✅ Connected to MongoDB');
//     app.listen(port, () => {
//       console.log(`🚀 Server running on port ${port}`);
//     });
//   })
//   .catch(err => {
//     console.error('❌ MongoDB connection error:', err);
//   });
/*************************/
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';

// import campersRouters from './src/routes/campersRouters.js';
// import bookingRouters from './src/routes/bookingRouters.js';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5001;

// // 1. ЛОГ ВХІДНИХ ЗАПИТІВ (Додайте це на самому початку)
// app.use((req, res, next) => {
//   console.log(
//     `[${new Date().toISOString()}] ${req.method} request to ${req.url}`
//   );
//   console.log(`Origin: ${req.headers.origin}`);
//   next();
// });

// // 2. НАЛАШТУВАННЯ CORS
// const allowedOrigins = [
//   'http://localhost:5173',
//   'http://127.0.0.1:5173',
//   process.env.CORS_ORIGIN,
// ].filter(Boolean);

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         console.log('❌ CORS заблокував запит з origin:', origin);
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//     optionsSuccessStatus: 200,
//   })
// );

// // Примусова обробка OPTIONS
// app.options('*', cors());

// app.use(express.json());

// // МАРШРУТИ
// app.use(campersRouters);
// app.use(bookingRouters);

// // ПІДКЛЮЧЕННЯ ДО БД
// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(() => {
//     console.log('✅ Connected to MongoDB');
//     app.listen(port, () => {
//       console.log(`🚀 Сервер запущено на http://localhost:${port}`);
//     });
//   })
//   .catch(err => {
//     console.error('❌ MongoDB Connection Error:', err.message);
//   });
