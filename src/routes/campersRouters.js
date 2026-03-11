import express from 'express';
import {
  getCampers,
  getCamperById,
  addReview,
} from '../controllers/campers.js';

const router = express.Router();

// Отримання всіх кемперів
router.get('/campers', getCampers);

// Отримання конкретного кемпера за ID
router.get('/campers/:id', getCamperById);

// Додавання відгуку для конкретного кемпера
router.post('/campers/:camperId/reviews', addReview);

export default router;
