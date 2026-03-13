import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import bookingRouters from './src/routes/bookingRouters.js';
import reviewRouters from './src/routes/reviewsRouters.js'; // Імпортовано як reviewRouters
import menuRouters from './src/routes/menuRouters.js';
import callbackRouters from './src/routes/callbackRouters.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
// Використовуємо port тільки якщо ми не на Vercel (локально)
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
}
// --- CORS налаштування ---
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use(express.json());

// --- МАРШРУТИ ---
app.use('/api/bookings', bookingRouters);

// ВИПРАВЛЕНО: Використовуємо саме ту назву, яку вказали при імпорті (reviewRouters)
app.use('/api/reviews', reviewRouters);

app.use('/api/menu', menuRouters);

app.use('/api/callbacks', callbackRouters);

// Додатково: Обробка неіснуючих маршрутів (допоможе відловити 404 помилки)
app.use((req, res) => {
  res
    .status(404)
    .json({ message: `Маршрут ${req.originalUrl} не знайдено на сервері` });
});

// --- ПІДКЛЮЧЕННЯ ДО БД ---
// На Vercel ми не викликаємо app.listen!
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });

// Експортуємо app для Vercel
export default app;
