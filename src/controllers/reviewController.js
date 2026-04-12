import Review from '../models/ReviewModel.js';

// Отримання всіх відгуків
export const getReviews = async (req, res) => {
  try {
    // Сортуємо за датою створення (спочатку нові)
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Додавання нового відгуку
// Додавання нового відгуку
export const addReview = async (req, res) => {
  try {
    const { name, comment, rating, avatar } = req.body;

    // Створюємо новий документ, використовуючи ТІЛЬКИ ті поля, що є в схемі
    const newReview = new Review({
      name,
      comment,
      rating,
      avatar: avatar || 'https://i.pravatar.cc/150',
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    console.error('❌ Validation Error Detail:', err.errors); // Це покаже, яке саме поле не пройшло
    res.status(500).json({ message: err.message });
  }
};
