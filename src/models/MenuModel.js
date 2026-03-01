import mongoose from 'mongoose';

// Схема відповідає структурі вашої бази coffee_comfort
const menuSchema = new mongoose.Schema(
  {
    name: {
      ua: { type: String, required: true },
      en: { type: String, required: true },
    },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String },
  },
  {
    collection: 'menu', // Явно вказуємо назву колекції зі скріншота
  }
);

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;
