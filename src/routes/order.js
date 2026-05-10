import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

/**
 * GET: Актуальні замовлення для бариста
 * Повертає замовлення зі статусами 'new', 'preparing' та 'ready'.
 */
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $in: ['new', 'preparing', 'ready'] },
    }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error('❌ Помилка при отриманні активних замовлень:', error);
    res
      .status(500)
      .json({ message: 'Помилка сервера при отриманні замовлень' });
  }
});

/**
 * GET: Історія завершених замовлень
 * Використовується на сторінці звітів (OrderHistory.jsx).
 */
router.get('/history', async (req, res) => {
  try {
    // Шукаємо лише замовлення зі статусом 'completed'
    const history = await Order.find({ status: 'completed' })
      .limit(100) // Збільшив ліміт до 100 для кращої звітності
      .sort({ updatedAt: -1 }); // Сортуємо за часом видачі (updatedAt)

    res.status(200).json(history);
  } catch (error) {
    console.error('❌ Помилка при отриманні історії замовлень:', error);
    res
      .status(500)
      .json({ message: 'Помилка сервера при завантаженні історії' });
  }
});

/**
 * POST: Створення нового замовлення
 */
router.post('/', async (req, res) => {
  try {
    // Розрахунок totalPrice, якщо він не прийшов з фронтенду
    const items = req.body.items || [];
    const calculatedTotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const newOrder = new Order({
      ...req.body,
      totalPrice: req.body.totalPrice || calculatedTotal,
      status: req.body.status || 'new',
      isPaid: req.body.isPaid || false,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('❌ Помилка при створенні замовлення:', error);
    res.status(400).json({ message: 'Помилка при створенні замовлення' });
  }
});

/**
 * PATCH: Оновлення статусу або оплати
 * Викликається при натисканні "Підготовлено" (ready) або "Видано" (completed).
 */
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, isPaid } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: { status, isPaid } },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Замовлення не знайдено' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(
      `❌ Помилка при оновленні замовлення ${req.params.id}:`,
      error
    );
    res.status(500).json({ message: 'Помилка сервера при оновленні статусу' });
  }
});

export default router;
