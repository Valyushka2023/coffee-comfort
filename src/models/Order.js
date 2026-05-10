import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    // Генеруємо 4-значний номер, якщо він не переданий
    default: () => Math.floor(1000 + Math.random() * 9000).toString(),
  },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  pickupTime: { type: String },
  items: [
    {
      _id: { type: String, required: true },
      name: {
        uk: { type: String },
        en: { type: String },
      },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
  totalAmount: { type: Number, required: true },
  // Статус замовлення: new (нове), preparing (готується), completed (виконано)
  status: {
    type: String,
    enum: ['new', 'preparing', 'ready', 'completed'],
    default: 'new',
  },
  // НОВЕ ПОЛЕ: чи оплачено замовлення
  isPaid: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
