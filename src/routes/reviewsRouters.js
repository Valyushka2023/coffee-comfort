// import express from 'express';
// import { getReviews, addReview } from '../controllers/reviewController.js';

// const router = express.Router();

// router.get('/', getReviews); // Тепер буде працювати http://localhost:5001/api/reviews

// router.post('/reviews', addReview);

// export default router;
import express from 'express';
import { getReviews, addReview } from '../controllers/reviewController.js';

const router = express.Router();

// GET http://localhost:5001/api/reviews
router.get('/', getReviews);

// POST http://localhost:5001/api/reviews
// ВИПРАВЛЕНО: прибрано зайвий префікс /reviews
router.post('/', addReview);

export default router;
