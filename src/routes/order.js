import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Отримання всіх замовлень (GET)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Помилка при отриманні замовлень:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// Створення нового замовлення (POST)
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Помилка при створенні замовлення:', error); // Тепер error використовується
    res.status(400).json({ message: 'Помилка створення' });
  }
});

export default router;
