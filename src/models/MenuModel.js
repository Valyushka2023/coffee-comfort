import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  key: { type: String, required: true }, // напр. 'americano'
  categoryKey: { type: String, required: true }, // напр. 'drinks'
  price: { type: Number, required: true },
  img: { type: String, required: true },
  top: { type: Boolean, default: false },
  name: { type: String }, // опціонально, якщо не хочете все тримати в i18n
  desc: { type: String },
});

export default mongoose.model('Menu', menuSchema, 'menu'); // 'menu' - назва вашої колекції в Compass
