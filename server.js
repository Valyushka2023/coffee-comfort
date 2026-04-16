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

app.use(cors());
app.use(express.json());

// --- МАРШРУТИ ---
app.use('/api/bookings', bookingRouters);
app.use('/api/reviews', reviewRouters);
app.use('/api/menu', menuRouters);
app.use('/api/callbacks', callbackRouters);

// Обробка 404
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// --- ПІДКЛЮЧЕННЯ ДО БД ---
mongoose
  .connect(process.env.MONGODB_URL || process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// --- СЕРВЕР ---

const port = process.env.PORT || 10000; // Render любить порт 10000
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));

export default app;
