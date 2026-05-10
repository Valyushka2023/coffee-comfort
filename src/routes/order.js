import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

/**
 * GET: Отримання замовлень
 * Тепер включаємо статус 'ready', щоб замовлення не зникало після підготовки.
 */
router.get('/', async (req, res) => {
  try {
    // Додаємо 'ready' у список статусів, які бачить бариста
    const orders = await Order.find({
      status: { $in: ['new', 'preparing', 'ready'] },
    }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Помилка при отриманні замовлень:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

/**
 * POST: Створення нового замовлення
 */
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order({
      ...req.body,
      status: req.body.status || 'new',
      isPaid: req.body.isPaid || false,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Помилка при створенні замовлення:', error);
    res.status(400).json({ message: 'Помилка створення' });
  }
});

/**
 * PATCH: Оновлення статусу або оплати
 */
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, isPaid } = req.body;

    // Якщо status === 'completed', замовлення автоматично зникне з панелі бариста
    // при наступному оновленні через фільтр у GET запиті вище.
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: { status, isPaid } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Замовлення не знайдено' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Помилка при оновленні замовлення:', error);
    res.status(500).json({ message: 'Помилка сервера при оновленні' });
  }
});

/**
 * GET: Історія замовлень
 */
router.get('/history', async (req, res) => {
  try {
    const history = await Order.find({ status: 'completed' })
      .limit(50)
      .sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error('Помилка при отриманні історії:', error);
    res.status(500).json({ message: 'Помилка сервера при завантаженні' });
  }
});

export default router;
