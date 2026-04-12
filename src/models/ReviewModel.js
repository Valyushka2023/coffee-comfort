// import mongoose from 'mongoose';

// const ReviewSchema = new mongoose.Schema(
//   {
//     name: {
//       en: { type: String, required: true },
//       uk: { type: String, required: true },
//     },
//     text: {
//       en: { type: String, required: true },
//       uk: { type: String, required: true },
//     },
//     rating: { type: Number, required: true, min: 1, max: 5 },
//     avatar: { type: String, default: 'https://i.pravatar.cc/150' },
//     date: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// );

// const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);

// export default Review;
import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    name: {
      en: {
        type: String,
        required: [true, 'errors.required'],
        minlength: 2,
        maxlength: 20,
      },
      uk: {
        type: String,
        required: [true, 'errors.required'],
        minlength: 2,
        maxlength: 20,
      },
    },
    comment: {
      // Всюди використовуємо comment
      en: {
        type: String,
        required: [true, 'errors.required'],
        default: '',
        maxlength: 150,
      },
      uk: {
        type: String,
        required: [true, 'errors.required'],
        default: '',
        maxlength: 150,
      },
    },
    rating: {
      type: Number,
      required: [true, 'errors.required'],
      min: 1,
      max: 5,
    },
    avatar: { type: String, default: 'https://i.pravatar.cc/150' },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Review = mongoose.models.Review || mongoose.model('Review', ReviewSchema);
export default Review;
