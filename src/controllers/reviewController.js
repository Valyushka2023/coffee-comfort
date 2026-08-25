import Review from '../models/ReviewModel.js';

export const addReview = async (req, res) => {
  try {
    const { name, text, rating, avatar } = req.body;

    // Нормалізація локалізованих полів name та text під Варіант Б
    const formattedName =
      typeof name === 'object' && name !== null
        ? name
        : { uk: String(name || ''), en: String(name || '') };

    const formattedText =
      typeof text === 'object' && text !== null
        ? text
        : { uk: String(text || ''), en: String(text || '') };

    const newReview = new Review({
      name: formattedName,
      text: formattedText,
      rating: Number(rating),
      avatar: avatar || 'https://i.pravatar.cc/150',
    });

    const savedReview = await newReview.save();

    // Повертаємо 201 та повністю сформований об'єкт відгуку з MongoDB (_id, createdAt)
    res.status(201).json(savedReview);
  } catch (err) {
    console.error('❌ Saving error:', err.message);
    res.status(500).json({ message: err.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
