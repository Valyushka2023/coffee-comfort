import express from 'express';
import { createBooking } from '../controllers/bookingController.js';

const router = express.Router();

// Маршрут: POST http://localhost:5001/api/bookings
router.post('/', createBooking);

export default router;
