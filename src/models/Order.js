// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//   items: [
//     {
//       _id: { type: String, required: true },
//       name: { uk: String, en: String },
//       price: Number,
//       quantity: Number,
//     },
//   ],
//   totalAmount: { type: Number, required: true },
//   status: { type: String, default: 'new' }, // new, preparing, ready, completed
//   createdAt: { type: Date, default: Date.now },
// });

// // Замість module.exports використовуємо export default
// const Order = mongoose.model('Order', orderSchema);
// export default Order;
/**/
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    default: () => Math.floor(1000 + Math.random() * 9000),
  }, // Випадкові 4 цифри
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  pickupTime: { type: String },
  items: [
    {
      _id: { type: String, required: true },
      name: { uk: String, en: String },
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'new' }, // new, preparing, ready, completed
  createdAt: { type: Date, default: Date.now },
});

// Замість module.exports використовуємо export default
const Order = mongoose.model('Order', orderSchema);
export default Order;
