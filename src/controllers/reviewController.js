import Review from '../models/ReviewModel.js';

export const addReview = async (req, res) => {
  try {
    const { name, text, rating, avatar } = req.body;

    const newReview = new Review({
      name,
      text,
      rating,
      avatar: avatar || 'https://i.pravatar.cc/150',
    });

    const savedReview = await newReview.save();
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
