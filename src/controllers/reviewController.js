import Review from '../models/ReviewModel.js';

// Отримання всіх відгуків
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find(); // Це безпосередньо дістає дані
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Додавання нового відгуку
export const addReview = async (req, res) => {
  try {
    const { name, text, rating, avatar } = req.body;

    const newReview = new Review({
      name,
      text,
      rating,
      avatar,
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    console.error('❌ Помилка збереження відгуку:', err.message);
    res.status(500).json({ message: err.message });
  }
};
