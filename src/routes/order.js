import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

/**
 * GET: Отримання замовлень
 * Ми додаємо фільтрацію, щоб бариста бачив лише актуальні (не завершені) замовлення.
 */
router.get('/', async (req, res) => {
  try {
    // Шукаємо замовлення зі статусом 'new' або 'preparing'
    // Це важливо, щоб виконані замовлення не висіли на панелі вічно
    const orders = await Order.find({
      status: { $in: ['new', 'preparing'] },
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
    // При створенні за замовчуванням status буде 'new',
    // а isPaid можна передавати з фронтенду (якщо оплата онлайн)
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
 * Саме цей метод викликатиме кнопка "ГОТОВО" на фронтенді
 */
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, isPaid } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { $set: { status, isPaid } },
      { new: true } // Повертає вже оновлений документ
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
 * GET: Історія замовлень (опціонально)
 * Якщо захочете зробити окрему сторінку з архівом виконаних замовлень
 */
router.get('/history', async (req, res) => {
  try {
    const history = await Order.find({ status: 'completed' })
      .limit(50)
      .sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    // Виправляємо помилку ESLint, використовуючи змінну error для логування
    console.error('Помилка при отриманні замовлень:', error);
    res.status(500).json({ message: 'Помилка сервера при завантаженні' });
  }
});

export default router;
