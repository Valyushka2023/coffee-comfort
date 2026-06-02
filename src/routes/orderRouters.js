import express from 'express';
import Order from '../models/Order.js';
import Ingredient from '../models/Ingredient.js';

const router = express.Router();

// Об'єкт рецептів (назви мають точно відповідати полю name.uk у БД товарів)
const RECIPES = {
  'Флет-вайт': [
    { name: 'Кава в зернах (Arabica)', amount: 0.018 },
    { name: 'Молоко', amount: 0.18 },
    { name: 'Стаканчики 250мл', amount: 1 },
  ],
  Капучино: [
    { name: 'Кава в зернах (Arabica)', amount: 0.018 },
    { name: 'Молоко', amount: 0.2 },
    { name: 'Стаканчики 250мл', amount: 1 },
  ],
  Американо: [
    { name: 'Кава в зернах (Arabica)', amount: 0.018 },
    { name: 'Стаканчики 110мл', amount: 1 },
  ],
  Латте: [
    { name: 'Кава в зернах (Arabica)', amount: 0.018 },
    { name: 'Молоко', amount: 0.25 },
    { name: 'Стаканчики 340мл', amount: 1 },
  ],
  Мокка: [
    { name: 'Кава в зернах (Arabica)', amount: 0.018 },
    { name: 'Молоко', amount: 0.2 },
    { name: 'Сироп Шоколад', amount: 1 },
    { name: 'Стаканчики 340мл', amount: 1 },
  ],
  Макіато: [
    { name: 'Кава в зернах (Arabica)', amount: 0.009 },
    { name: 'Молоко', amount: 0.05 },
    { name: 'Стаканчики 110мл', amount: 1 },
  ],
  Млинці: [{ name: 'Млинці', amount: 1 }],
  Чізкейк: [{ name: 'Чізкейк', amount: 1 }],
  Круасан: [{ name: 'Круасан', amount: 1 }],
  Булочка: [{ name: 'Булочка', amount: 1 }],
  Кекс: [{ name: 'Кекс', amount: 1 }],
  Ватрушки: [{ name: 'Ватрушки', amount: 1 }],
  'Сироп Карамель': [{ name: 'Сироп Карамель', amount: 1 }],
  'Цукор в стіках': [{ name: 'Цукор в стіках', amount: 2 }],
};

// PATCH: Оновлення статусу та списання
router.patch('/:id', async (req, res) => {
  try {
    const { status, isPaid } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({ message: 'Замовлення не знайдено' });

    if (status === 'completed' && order.status !== 'completed') {
      for (const item of order.items) {
        // Очищення назви від зайвих пробілів/переносів
        const itemName = item.name.uk.replace(/\s+/g, ' ').trim();
        const recipe = RECIPES[itemName];

        if (recipe) {
          for (const ing of recipe) {
            // РОЗРАХУНОК З ОКРУГЛЕННЯМ
            const totalDeduction = Number(
              (ing.amount * item.quantity).toFixed(3)
            );

            await Ingredient.findOneAndUpdate(
              { 'name.uk': ing.name },
              { $inc: { quantity: -totalDeduction } }
            );
          }
        }
      }
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { status, isPaid } },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('❌ Помилка оновлення статусу/списання:', error);
    res.status(500).json({ message: 'Помилка оновлення' });
  }
});
// ==========================================
// DELETE: Скасування/Видалення замовлення
// ==========================================
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Шукаємо та видаляємо замовлення з бази даних MongoDB
    const deletedOrder = await Order.findByIdAndDelete(id);

    // Якщо замовлення з таким ID вже немає (наприклад, видалив інший бариста)
    if (!deletedOrder) {
      return res
        .status(404)
        .json({ message: 'Замовлення не знайдено або вже видалено' });
    }

    // Повертаємо статус 200 та інформацію про те, що все пройшло успішно
    res.status(200).json({
      message: 'Замовлення успішно скасовано',
      id,
    });
  } catch (error) {
    console.error('❌ Помилка під час скасування замовлення:', error);
    res
      .status(500)
      .json({ message: 'Внутрішня помилка сервера при скасуванні' });
  }
});
// GET: Історія замовлень
router.get('/history', async (req, res) => {
  try {
    const history = await Order.find({
      status: { $in: ['completed', 'ready'] },
    })
      .limit(50)
      .sort({ updatedAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка завантаження історії' });
  }
});

// GET: Аналітика (ГРУПУВАННЯ ЗА ОБ'ЄКТОМ НАЗВИ)
router.get('/stats', async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: 'Дата не вказана' });

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const stats = await Order.aggregate([
      {
        $match: {
          status: 'completed',
          updatedAt: { $gte: startOfDay, $lte: endOfDay },
        },
      },
      { $unwind: '$items' },
      {
        $group: {
          // Групуємо за об'єктом name: { uk, en }, щоб зберегти обидві мови
          _id: '$items.name',
          totalQuantity: { $sum: '$items.quantity' },
          totalPrice: {
            $sum: { $multiply: ['$items.price', '$items.quantity'] },
          },
        },
      },
      { $sort: { totalQuantity: -1 } },
    ]);
    res.status(200).json(stats);
  } catch (error) {
    console.error('❌ Помилка сервера в аналітиці:', error);
    res.status(500).json({ message: 'Помилка аналітики' });
  }
});

// POST: Створення замовлення
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET: Активні замовлення для табло бариста
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $in: ['new', 'preparing', 'ready'] },
    }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка завантаження' });
  }
});

export default router;
