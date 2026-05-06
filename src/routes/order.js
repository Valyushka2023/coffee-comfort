import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // Додаємо customerName та customerPhone у конструктор
    const newOrder = new Order({
      customerName: req.body.customerName,
      customerPhone: req.body.customerPhone,
      pickupTime: req.body.pickupTime, // Приймаємо час від клієнта
      items: req.body.items,
      totalAmount: req.body.totalAmount,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    // Якщо виникає помилка валідації, ми її побачимо в консолі сервера
    console.error('Помилка створення замовлення:', err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
