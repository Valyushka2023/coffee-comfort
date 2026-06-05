import express from 'express';
import Order from '../models/Order.js';
import Ingredient from '../models/Ingredient.js';

const router = express.Router();

// Об'єкт рецептів з незгораємим запасом (safetyStock)
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
};

// Вспоміжний метод для агрегації однакових інгредієнтів у кошику замовлення
function calculateTotalIngredientsForOrder(items) {
  const totals = {};
  for (const item of items) {
    const itemSlug = item.slug || (item.name && item.name.en);
    const recipe = RECIPES[itemSlug];

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
    }
  }
  return totals;
}

// =======================================================
// POST: Створення замовлення з атомарною перевіркою
// =======================================================
router.post('/', async (req, res) => {
  try {
    const { items } = req.body;
    console.log('=== 📥 НОВЕ ЗАМОВЛЕННЯ НА ПЕРЕВІРКУ ===');
    console.log('Отримані товари з фронтенду:', JSON.stringify(items, null, 2));

    const totalIngredientsNeeded = calculateTotalIngredientsForOrder(items);
    console.log(
      'Сумарно інгредієнтів треба для цього чеку:',
      totalIngredientsNeeded
    );

    for (const [nameUk, data] of Object.entries(totalIngredientsNeeded)) {
      const currentIngredient = await Ingredient.findOne({ 'name.uk': nameUk });

      console.log(`Перевіряю інгредієнт: [${nameUk}]`);
      console.log(`Знайдено в БД:`, currentIngredient);

      if (!currentIngredient) {
        console.log(
          `❌ ПОМИЛКА: Інгредієнт [${nameUk}] взагалі НЕ ЗНАЙДЕНО в базі даних! Перевірка зірвалася.`
        );
        return res
          .status(400)
          .json({ message: 'OUT_OF_STOCK_RESERVE', details: nameUk });
      }

      const minAllowed = data.safetyStock;
      const remainsAfterValidation = currentIngredient.quantity - data.amount;
      console.log(
        `Поточна кількість в БД: ${currentIngredient.quantity}, Треба списати: ${data.amount}, Лишиться: ${remainsAfterValidation}, Мінімальний ліміт: ${minAllowed}`
      );

      if (remainsAfterValidation < minAllowed) {
        console.log(
          '❌ ПОМИЛКА: Товари закінчилися (або порушено резерв)! Блокуємо замовлення.'
        );
        return res
          .status(400)
          .json({ message: 'OUT_OF_STOCK_RESERVE', details: nameUk });
      }
    }

    console.log('✅ ВСЕ ОК: Перевірка пройдена, склад дозволяє покупку.');
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('❌ Помилка створення замовлення:', error);
    res.status(400).json({ message: 'CREATE_ORDER_FAILED' });
  }
});

// =======================================================
// PATCH: Оновлення статусу та АТОМАРНЕ безпечне списання
// =======================================================
router.patch('/:id', async (req, res) => {
  try {
    const { status, isPaid, paymentMethod } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'ORDER_NOT_FOUND' });
    }

    if (status === 'completed' && order.status !== 'completed') {
      const totalIngredientsNeeded = calculateTotalIngredientsForOrder(
        order.items
      );
      const updatedIngredientsRollback = [];

      try {
        // Атомарно списуємо кожен інгредієнт з жорсткою умовою в запиті MongoDB
        for (const [nameUk, data] of Object.entries(totalIngredientsNeeded)) {
          const totalDeduction = Number(data.amount.toFixed(3));

          // Ключове виправлення: умова { quantity: { $gte: totalDeduction } }
          // фізично не дозволить MongoDB виконати списання, якщо на складі менше ніж треба.
          const updated = await Ingredient.findOneAndUpdate(
            {
              'name.uk': nameUk,
              quantity: { $gte: totalDeduction },
            },
            { $inc: { quantity: -totalDeduction } },
            { new: true }
          );

          // Якщо хоча б один інгредієнт не пройшов умову — кидаємо помилку для відкату операції
          if (!updated) {
            throw new Error(`INSUFFICIENT_STOCK:${nameUk}`);
          }

          // Запам'ятовуємо, що вже успішно списали, на випадок скасування операції
          updatedIngredientsRollback.push({ nameUk, amount: totalDeduction });
        }
      } catch (stockError) {
        // РОЛБЕК: Якщо посеред чеку виявився брак товару — повертаємо назад все, що встигли списати за цей запит
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

    // Тільки якщо всі інгредієнти успішно списалися, міняємо статус замовлення
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { status, isPaid, paymentMethod } },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('❌ Помилка оновлення статусу/списання:', error);
    res.status(500).json({ message: 'UPDATE_FAILED' });
  }
});

// =======================================================
// DELETE: Скасування/Видалення замовлення
// =======================================================
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'ORDER_NOT_FOUND' });
    }

    res.status(200).json({
      message: 'ORDER_CANCELLED_SUCCESSFULLY',
      id,
    });
  } catch (error) {
    console.error('❌ Помилка під час скасування замовлення:', error);
    res.status(500).json({ message: 'CANCEL_FAILED' });
  }
});

// =======================================================
// GET: Історія замовлень
// =======================================================
router.get('/history', async (req, res) => {
  try {
    const history = await Order.find({ status: 'completed', isPaid: true })
      .limit(100)
      .sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error('❌ Помилка завантаження історії:', error);
    res.status(500).json({ message: 'FETCH_HISTORY_FAILED' });
  }
});

// =======================================================
// GET: Аналітика за конкретний день
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
            createdAt: { $gte: startOfDay, $lte: endOfDay },
          },
        },
        { $unwind: '$items' },
        {
          $group: {
            _id: '$items.slug',
            name: { $first: '$items.name' },
            totalQuantity: { $sum: '$items.quantity' },
            totalPrice: {
              $sum: { $multiply: ['$items.price', '$items.quantity'] },
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
            createdAt: { $gte: startOfDay, $lte: endOfDay },
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
    console.error('❌ Помилка сервера в аналітиці:', error);
    res.status(500).json({ message: 'STATS_FAILED' });
  }
});

// =======================================================
// GET: Активні замовлення
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
