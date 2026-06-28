import mongoose from 'mongoose';

// Схема відповідає структурі вашої бази coffee_comfort
const menuSchema = new mongoose.Schema(
  {
    // Використовуємо 'key' як на скріншоті бази
    key: { type: String, required: true },
    // Об'єкт для назви
    name: {
      ua: { type: String, required: true },
      en: { type: String, required: true },
    },
    // НОВЕ ПОЛЕ: Об'єкт для опису
    description: {
      ua: { type: String, default: '' },
      en: { type: String, default: '' },
    },
    price: { type: Number, required: true },
    categoryKey: { type: String, required: true }, // 'categoryKey' замість 'category'
    img: { type: String }, // 'img' замість 'image'
    top: { type: Boolean, default: false },
  },
  { collection: 'menu' }
);

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;
