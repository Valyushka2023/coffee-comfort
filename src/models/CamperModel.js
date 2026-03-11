import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
    maxlength: 500,
  },
  reviewer_name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  reviewer_rating: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    maxlength: 20,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const camperSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rating: Number,
    location: String,
    id: String,
    form: String,
    length: String,
    width: String,
    height: String,
    tank: String,
    consumption: String,
    transmission: String,
    engine: String,
    AC: Boolean,
    bathroom: Boolean,
    kitchen: Boolean,
    TV: Boolean,
    radio: Boolean,
    refrigerator: Boolean,
    microwave: Boolean,
    gas: Boolean,
    water: Boolean,
    gallery: [String],
    reviews: [reviewSchema],
  },
  {
    collection: 'campers',
  }
);

const Camper = mongoose.model('Camper', camperSchema);

export default Camper;
