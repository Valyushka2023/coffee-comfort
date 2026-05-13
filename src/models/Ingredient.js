import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'шт' },
  minLimit: { type: Number, default: 5 },
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
export default Ingredient;
