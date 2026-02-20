import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      ua: { type: String, required: true },
    },
    text: {
      en: { type: String, required: true },
      ua: { type: String, required: true },
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    avatar: { type: String, default: 'https://i.pravatar.cc/150' },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Перевіряємо, чи модель уже створена (важливо для Next.js), інакше створюємо нову
const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

export default Review;
