import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      // Генеруємо 4-значний номер, якщо він не переданий
      default: () => Math.floor(1000 + Math.random() * 9000).toString(),
    },
    customerName: {
      type: String,
      required: true,
      trim: true, // Автоматично видаляє пробіли на початку та в кінці рядка
      // Функція set відформатує ім'я (наприклад, "  ket  " -> "Ket") перед збереженням в базу
      set: function (value) {
        if (!value) return value;
        const trimmed = value.trim();
        return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
      },
    },
    customerPhone: {
      type: String,
      required: true,
      trim: true,
      // Додаємо валідацію на рівні бази даних
      validate: {
        validator: function (v) {
          // Регулярний вираз перевіряє формат +380XXXXXXXXX (всього 13 символів)
          return /^\+380\d{9}$/.test(v);
        },
        message: props =>
          `${props.value} не є коректним номером телефону! Формат має бути +380XXXXXXXXX`,
      },
    },
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
