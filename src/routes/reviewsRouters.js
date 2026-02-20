// import express from 'express';
// import Review from '../models/ReviewModel.js'; // Імпортуй свою схему

// const router = express.Router();

// // GET /api/reviews
// router.get('/', async (req, res) => {
//   try {
//     // Сортуємо: нові відгуки будуть першими
//     const reviews = await Review.find().sort({ createdAt: -1 });
//     res.status(200).json(reviews);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: 'Помилка сервера при отриманні відгуків', error });
//   }
// });

// // POST /api/reviews (якщо захочеш додавати відгуки через форму)
// router.post('/', async (req, res) => {
//   try {
//     const newReview = new Review(req.body);
//     const savedReview = await newReview.save();
//     res.status(201).json(savedReview);
//   } catch (error) {
//     res.status(400).json({ message: 'Помилка при збереженні відгуку', error });
//   }
// });

// export default router;
import express from 'express';
import Review from '../models/ReviewModel.js';

const router = express.Router();

// GET /api/reviews - Отримання списку
router.get('/', async (req, res) => {
  try {
    // Сортуємо: нові відгуки будуть першими
    // Примітка: використовуйте { date: -1 } або { createdAt: -1 } залежно від вашої схеми
    const reviews = await Review.find().sort({ date: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Помилка сервера при отриманні відгуків', error });
  }
});

// POST /api/reviews - Додавання нового відгуку
router.post('/', async (req, res) => {
  try {
    const { name, text, rating, avatar } = req.body;

    // Створюємо новий об'єкт відгуку з покращеною логікою
    const newReview = new Review({
      name, // Очікує об'єкт { en: "...", uk: "..." }
      text, // Очікує об'єкт { en: "...", uk: "..." }
      rating,
      // Якщо аватар не передано, створюємо рандомний через сервіс DiceBear
      avatar:
        avatar ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    // Виводимо повідомлення про помилку з повідомленням від Mongoose
    res.status(400).json({
      message: 'Помилка при збереженні відгуку',
      error: error.message,
    });
  }
});

export default router;
