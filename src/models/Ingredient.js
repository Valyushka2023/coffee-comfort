import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema(
  {
    name: {
      uk: { type: String, required: true },
      en: { type: String, required: true },
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    unit: {
      uk: { type: String, required: true },
      en: { type: String, required: true },
    },
    minLimit: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
); // Додасть дату створення та оновлення автоматично

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
export default Ingredient;
