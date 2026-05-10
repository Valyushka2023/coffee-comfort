import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
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
    // Використовуємо totalPrice, щоб відповідати логіці в маршрутах (routes)
    totalPrice: { type: Number, required: true },

    // Статуси: додано 'ready' для проміжного етапу
    status: {
      type: String,
      enum: ['new', 'preparing', 'ready', 'completed'],
      default: 'new',
    },
    // Чи оплачено замовлення
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    // timestamps автоматично додає createdAt та updatedAt
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
