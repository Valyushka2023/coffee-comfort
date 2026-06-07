import express from 'express';
import Order from '../models/Order.js';
import Ingredient from '../models/Ingredient.js';

const router = express.Router();

// Об'єкт рецептів (ключі — це slug, name.en або українська назва страви)
const RECIPES = {
  'flat-white': [
    { nameUk: 'Кава в зернах (Arabica)', amount: 0.018, safetyStock: 0.05 },
    { nameUk: 'Молоко', amount: 0.18, safetyStock: 0.5 },
    { nameUk: 'Стаканчики 250мл', amount: 1, safetyStock: 5 },
  ],
  cappuccino: [
    { nameUk: 'Кава в зернах (Arabica)', amount: 0.018, safetyStock: 0.05 },
    { nameUk: 'Молоко', amount: 0.2, safetyStock: 0.5 },
    { nameUk: 'Стаканчики 250мл', amount: 1, safetyStock: 5 },
  ],
  americano: [
    { nameUk: 'Кава в зернах (Arabica)', amount: 0.018, safetyStock: 0.05 },
    { nameUk: 'Стаканчики 110мл', amount: 1, safetyStock: 5 },
  ],
  latte: [
    { nameUk: 'Кава в зернах (Arabica)', amount: 0.018, safetyStock: 0.05 },
    { nameUk: 'Молоко', amount: 0.25, safetyStock: 0.5 },
    { nameUk: 'Стаканчики 340мл', amount: 1, safetyStock: 5 },
  ],
  mocha: [
    { nameUk: 'Кава в зернах (Arabica)', amount: 0.018, safetyStock: 0.05 },
    { nameUk: 'Молоко', amount: 0.2, safetyStock: 0.5 },
    { nameUk: 'Сироп Шоколад', amount: 1, safetyStock: 2 },
    { nameUk: 'Стаканчики 340мл', amount: 1, safetyStock: 5 },
  ],
  macchiato: [
    { nameUk: 'Кава в зернах (Arabica)', amount: 0.009, safetyStock: 0.05 },
    { nameUk: 'Молоко', amount: 0.05, safetyStock: 0.5 },
    { nameUk: 'Стаканчики 110мл', amount: 1, safetyStock: 5 },
  ],
  pancakes: [{ nameUk: 'Млинці', amount: 1, safetyStock: 2 }],
  cheesecake: [{ nameUk: 'Чізкейк', amount: 1, safetyStock: 2 }],
  croissant: [{ nameUk: 'Круасан', amount: 1, safetyStock: 2 }],
  bun: [{ nameUk: 'Булочка', amount: 1, safetyStock: 2 }],
  muffin: [{ nameUk: 'Кекс', amount: 1, safetyStock: 2 }],
  vatrushka: [{ nameUk: 'Ватрушки', amount: 1, safetyStock: 2 }],
  'caramel-syrup': [{ nameUk: 'Сироп Карамель', amount: 1, safetyStock: 1 }],
  'sugar-sticks': [{ nameUk: 'Цукор в стіках', amount: 2, safetyStock: 10 }],

  // Фолбеки для українських назв та сирих рядків із кошика
  'Кава в зернах (Arabica)': [
    { nameUk: 'Кава в зернах (Arabica)', amount: 0.018, safetyStock: 0.05 },
  ],
  Млинці: [{ nameUk: 'Млинці', amount: 1, safetyStock: 2 }],
  Чізкейк: [{ nameUk: 'Чізкейк', amount: 1, safetyStock: 2 }],
  Круасан: [{ nameUk: 'Круасан', amount: 1, safetyStock: 2 }],
  Булочка: [{ nameUk: 'Булочка', amount: 1, safetyStock: 2 }],
  Кекс: [{ nameUk: 'Кекс', amount: 1, safetyStock: 2 }],
  Ватрушки: [{ nameUk: 'Ватрушки', amount: 1, safetyStock: 2 }],
  Капучино: [
    { nameUk: 'Кава в зернах (Arabica)', amount: 0.018, safetyStock: 0.05 },
    { nameUk: 'Молоко', amount: 0.2, safetyStock: 0.5 },
    { nameUk: 'Стаканчики 250мл', amount: 1, safetyStock: 5 },
  ],
  Латте: [
    { nameUk: 'Кава в зернах (Arabica)', amount: 0.018, safetyStock: 0.05 },
    { nameUk: 'Молоко', amount: 0.25, safetyStock: 0.5 },
    { nameUk: 'Стаканчики 340мл', amount: 1, safetyStock: 5 },
  ],
  'Флет-вайт': [
    { nameUk: 'Кава в зернах (Arabica)', amount: 0.018, safetyStock: 0.05 },
    { nameUk: 'Молоко', amount: 0.18, safetyStock: 0.5 },
    { nameUk: 'Стаканчики 250мл', amount: 1, safetyStock: 5 },
  ],
};

// Розумна та безпечна функція пошуку рецепту
function findRecipe(item) {
  if (!item) return null;

  // 1. Шукаємо за slug (якщо він є і є рядком)
  if (item.slug && typeof item.slug === 'string') {
    const slugKey = item.slug.toLowerCase();
    if (RECIPES[slugKey]) return RECIPES[slugKey];
  }

  // 2. Шукаємо за name.en (якщо назва — це об'єкт і є поле en)
  if (item.name && typeof item.name === 'object' && item.name.en) {
    const enKey = String(item.name.en).toLowerCase();
    if (RECIPES[enKey]) return RECIPES[enKey];
  }

  // 3. Шукаємо за name.uk (якщо назва — це об'єкт і є pole uk)
  if (item.name && typeof item.name === 'object' && item.name.uk) {
    if (RECIPES[item.name.uk]) return RECIPES[item.name.uk];
  }

  // 4. Якщо name — це просто звичайний рядок (наприклад, з кошика фронтенду)
  if (item.name && typeof item.name === 'string') {
    if (RECIPES[item.name]) return RECIPES[item.name];
    const stringKey = item.name.toLowerCase();
    if (RECIPES[stringKey]) return RECIPES[stringKey];
  }

  return null;
}

// Обчислення інгредієнтів
function calculateTotalIngredientsForOrder(items) {
  const totals = {};
  if (!Array.isArray(items)) return totals;

  for (const item of items) {
    const recipe = findRecipe(item);

    if (recipe) {
      for (const ing of recipe) {
        const neededForPosition = Number(
          (ing.amount * item.quantity).toFixed(3)
        );
        if (!totals[ing.nameUk]) {
          totals[ing.nameUk] = {
            amount: 0,
            safetyStock: ing.safetyStock || 0,
          };
        }
        totals[ing.nameUk].amount += neededForPosition;
      }
    } else {
      console.warn(`⚠️ Рецепт для страви не знайдено:`, item);
    }
  }
  return totals;
}

// =======================================================
// POST: Створення замовлення (БЕЗПЕЧНЕ)
// =======================================================
router.post('/', async (req, res) => {
  try {
    const { items } = req.body;

    if (items && Array.isArray(items)) {
      const totalIngredientsNeeded = calculateTotalIngredientsForOrder(items);

      for (const [nameUk, data] of Object.entries(totalIngredientsNeeded)) {
        const currentIngredient = await Ingredient.findOne({
          'name.uk': nameUk,
        });

        if (!currentIngredient) {
          return res
            .status(400)
            .json({ message: 'OUT_OF_STOCK_RESERVE', details: nameUk });
        }

        const minAllowed = data.safetyStock;
        const remainsAfterValidation = currentIngredient.quantity - data.amount;

        if (remainsAfterValidation < minAllowed) {
          return res
            .status(400)
            .json({ message: 'OUT_OF_STOCK_RESERVE', details: nameUk });
        }
      }
    }

    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('❌ Помилка створення замовлення:', error);
    res.status(400).json({ message: 'CREATE_ORDER_FAILED' });
  }
});

// =======================================================
// PATCH: Оновлення статусу та безпечне списання складників
// =======================================================
router.patch('/:id', async (req, res) => {
  try {
    const { status, isPaid, paymentMethod } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'ORDER_NOT_FOUND' });
    }

    // Якщо замовлення переводять у статус "виконано" і воно ще не було виконане раніше
    if (status === 'completed' && order.status !== 'completed' && order.items) {
      console.log(
        `=== 📦 СПИСАННЯ ДЛЯ ЧЕКУ №${order.orderNumber || order._id} ===`
      );

      const totalIngredientsNeeded = calculateTotalIngredientsForOrder(
        order.items
      );
      const updatedIngredientsRollback = [];

      try {
        for (const [nameUk, data] of Object.entries(totalIngredientsNeeded)) {
          const totalDeduction = Number(data.amount.toFixed(3));
          console.log(`Спробуємо списати: ${nameUk} -> ${totalDeduction}`);

          const updated = await Ingredient.findOneAndUpdate(
            {
              'name.uk': nameUk,
              quantity: { $gte: totalDeduction },
            },
            { $inc: { quantity: -totalDeduction } },
            { new: true }
          );

          if (!updated) {
            console.error(`❌ Не вистачає інгредієнта на складі: ${nameUk}`);
            throw new Error(`INSUFFICIENT_STOCK:${nameUk}`);
          }

          updatedIngredientsRollback.push({ nameUk, amount: totalDeduction });
        }
      } catch (stockError) {
        console.log('↩️ Робимо відкат (Rollback) змін на складі...');
        for (const rolled of updatedIngredientsRollback) {
          await Ingredient.findOneAndUpdate(
            { 'name.uk': rolled.nameUk },
            { $inc: { quantity: rolled.amount } }
          );
        }

        const missingItemName = stockError.message.split(':')[1] || 'Товар';
        return res.status(400).json({
          message: 'INSUFFICIENT_STOCK',
          details: missingItemName,
        });
      }
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { status, isPaid, paymentMethod } },
      { new: true }
    );

    console.log('✅ Статус успішно оновлено на completed!');
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('❌ Помилка оновлення статусу/списання:', error);
    res.status(500).json({ message: 'UPDATE_FAILED' });
  }
});

// =======================================================
// DELETE: Скасування замовлення
// =======================================================
router.delete('/:id', async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder)
      return res.status(404).json({ message: 'ORDER_NOT_FOUND' });
    res
      .status(200)
      .json({ message: 'ORDER_CANCELLED_SUCCESSFULLY', id: req.params.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'CANCEL_FAILED' });
  }
});

// =======================================================
// GET: Історія виконаних замовлень
// =======================================================
router.get('/history', async (req, res) => {
  try {
    const history = await Order.find({ status: 'completed', isPaid: true })
      .limit(100)
      .sort({ updatedAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'FETCH_HISTORY_FAILED' });
  }
});

// =======================================================
// GET: Статистика та аналітика за день (з правильним групуванням)
// =======================================================
router.get('/stats', async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: 'DATE_REQUIRED' });

    const startOfDay = new Date(`${date}T00:00:00.000+03:00`);
    const endOfDay = new Date(`${date}T23:59:59.999+03:00`);

    const [dishStats, paymentStats] = await Promise.all([
      Order.aggregate([
        {
          $match: {
            status: 'completed',
            isPaid: true,
            updatedAt: { $gte: startOfDay, $lte: endOfDay },
          },
        },
        { $unwind: '$items' },
        {
          $group: {
            _id: { $ifNull: ['$items.name.uk', '$items.name'] },
            nameUk: { $first: { $ifNull: ['$items.name.uk', '$items.name'] } },
            nameEn: { $first: { $ifNull: ['$items.name.en', '$items.slug'] } },
            totalQuantity: { $sum: '$items.quantity' },
            totalPrice: {
              $sum: { $multiply: ['$items.price', '$items.quantity'] },
            },
          },
        },
        {
          $project: {
            _id: 1,
            totalQuantity: 1,
            totalPrice: 1,
            name: {
              uk: '$nameUk',
              en: { $ifNull: ['$nameEn', '$nameUk'] },
            },
          },
        },
        { $sort: { totalQuantity: -1 } },
      ]),
      Order.aggregate([
        {
          $match: {
            status: 'completed',
            isPaid: true,
            updatedAt: { $gte: startOfDay, $lte: endOfDay },
          },
        },
        {
          $group: {
            _id: '$paymentMethod',
            totalAmount: { $sum: '$totalPrice' },
          },
        },
      ]),
    ]);

    const cashData = paymentStats.find(p => p._id === 'cash');
    const cardData = paymentStats.find(p => p._id === 'card');

    res.status(200).json({
      dishes: dishStats,
      cash: cashData ? cashData.totalAmount : 0,
      card: cardData ? cardData.totalAmount : 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'STATS_FAILED' });
  }
});

// =======================================================
// GET: Активні замовлення для Панелі баристи
// =======================================================
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $in: ['new', 'preparing', 'ready'] },
    }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'FETCH_ORDERS_FAILED' });
  }
});

export default router;
