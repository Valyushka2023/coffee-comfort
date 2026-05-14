// import express from 'express';
// import Order from '../models/Order.js';

// const router = express.Router();
// /**
//  * POST: Створення нового замовлення
//  */
// router.post('/', async (req, res) => {
//   try {
//     const newOrder = new Order(req.body);
//     const savedOrder = await newOrder.save();
//     res.status(201).json(savedOrder);
//   } catch (error) {
//     console.error('❌ Помилка при створенні замовлення:', error);
//     res
//       .status(400)
//       .json({ message: 'Помилка валідації або даних', error: error.message });
//   }
// });

// /**
//  * GET: Аналітика продажів за обрану дату
//  * Повертає згруповані дані: назва страви, кількість, сума.
//  */
// router.get('/stats', async (req, res) => {
//   try {
//     const { date } = req.query; // Очікуємо "YYYY-MM-DD"
//     if (!date) return res.status(400).json({ message: 'Дата не вказана' });

//     const startOfDay = new Date(date);
//     startOfDay.setHours(0, 0, 0, 0);

//     const endOfDay = new Date(date);
//     endOfDay.setHours(23, 59, 59, 999);

//     const stats = await Order.aggregate([
//       {
//         // Відфільтровуємо лише завершені замовлення за конкретний проміжок часу
//         $match: {
//           status: 'completed',
//           updatedAt: { $gte: startOfDay, $lte: endOfDay },
//         },
//       },
//       {
//         // "Розпаковуємо" масив страв
//         $unwind: '$items',
//       },
//       {
//         // Групуємо за назвою (UK) та рахуємо суми
//         $group: {
//           _id: '$items.name.uk',
//           totalQuantity: { $sum: '$items.quantity' },
//           totalPrice: {
//             $sum: { $multiply: ['$items.price', '$items.quantity'] },
//           },
//         },
//       },
//       {
//         $sort: { totalQuantity: -1 }, // Найпопулярніші зверху
//       },
//     ]);

//     res.status(200).json(stats);
//   } catch (error) {
//     console.error('❌ Помилка аналітики:', error);
//     res.status(500).json({ message: 'Помилка сервера при формуванні звіту' });
//   }
// });

// /**
//  * GET: Актуальні замовлення для бариста
//  */
// router.get('/', async (req, res) => {
//   try {
//     const orders = await Order.find({
//       status: { $in: ['new', 'preparing', 'ready'] },
//     }).sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Помилка сервера' });
//   }
// });

// /**
//  * GET: Історія замовлень (останні 100)
//  */
// router.get('/history', async (req, res) => {
//   try {
//     const history = await Order.find({ status: 'completed' })
//       .limit(100)
//       .sort({ updatedAt: -1 });
//     res.status(200).json(history);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Помилка історії' });
//   }
// });

// /**
//  * PATCH: Оновлення статусу
//  */
// router.patch('/:id', async (req, res) => {
//   try {
//     const { status, isPaid } = req.body;
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { $set: { status, isPaid } },
//       { new: true }
//     );
//     res.status(200).json(updatedOrder);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Помилка оновлення' });
//   }
// });

// export default router;
/**/
import express from 'express';
import Order from '../models/Order.js';
import Ingredient from '../models/Ingredient.js';

const router = express.Router();

// Об'єкт рецептів: назви ключів (наприклад, 'Флет-вайт')
// мають точно відповідати полю name.uk у вашій базі товарів.
const RECIPES = {
  // --- НАПОЇ ---
  'Флет-вайт': [
    { name: 'Кава в зернах (Arabica)', amount: 0.018 }, // кг
    { name: 'Молоко 2.5%', amount: 0.18 }, // л
    { name: 'Стаканчики 250мл', amount: 1 }, // шт
  ],
  Капучино: [
    { name: 'Кава в зернах (Arabica)', amount: 0.018 },
    { name: 'Молоко 2.5%', amount: 0.2 },
    { name: 'Стаканчики 250мл', amount: 1 },
  ],
  Американо: [
    { name: 'Кава в зернах (Arabica)', amount: 0.018 },
    { name: 'Стаканчики 110мл', amount: 1 },
  ],
  Латте: [
    { name: 'Кава в зернах (Arabica)', amount: 0.018 },
    { name: 'Молоко 2.5%', amount: 0.25 },
    { name: 'Стаканчики 340мл', amount: 1 },
  ],
  Мокка: [
    { name: 'Кава в зернах (Arabica)', amount: 0.018 },
    { name: 'Молоко 2.5%', amount: 0.2 },
    { name: 'Сироп Шоколад', amount: 1 },
    { name: 'Стаканчики 340мл', amount: 1 },
  ],
  Макіато: [
    { name: 'Кава в зернах (Arabica)', amount: 0.009 },
    { name: 'Молоко 2.5%', amount: 0.05 },
    { name: 'Стаканчики 110мл', amount: 1 },
  ],

  // --- ВИПІЧКА ---
  Млинці: [{ name: 'Млинці', amount: 1 }],
  Чізкейк: [{ name: 'Чізкейк', amount: 1 }],
  Круасан: [{ name: 'Круасан', amount: 1 }],
  Булочка: [{ name: 'Булочка', amount: 1 }],
  Кекс: [{ name: 'Кекс', amount: 1 }],
  Ватрушки: [{ name: 'Ватрушки', amount: 1 }],

  // --- ДОДАТКОВО ---
  'Сироп Карамель': [{ name: 'Сироп Карамель', amount: 1 }],
  'Цукор в стіках': [{ name: 'Цукор в стіках', amount: 2 }],
};

/**
 * POST: Створення нового замовлення
 */
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('❌ Помилка при створенні замовлення:', error);
    res
      .status(400)
      .json({ message: 'Помилка валідації', error: error.message });
  }
});

/**
 * PATCH: Оновлення статусу та списання інгредієнтів
 */
router.patch('/:id', async (req, res) => {
  try {
    const { status, isPaid } = req.body;
    const orderId = req.params.id;

    // 1. Знаходимо замовлення в БД
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Замовлення не знайдено' });
    }

    // 2. ЛОГІКА СПИСАННЯ
    // Списуємо інгредієнти тільки якщо статус змінюється на 'completed' вперше
    if (status === 'completed' && order.status !== 'completed') {
      console.log(
        `\n🚀 ПРОВЕДЕННЯ СПИСАННЯ для замовлення №${order.orderNumber}`
      );

      for (const item of order.items) {
        // Очищаємо назву від зайвих пробілів та можливих переносів рядків
        const itemName = item.name.uk.replace(/\s+/g, ' ').trim();
        const recipe = RECIPES[itemName];

        if (recipe) {
          console.log(`📦 Товар: ${itemName}, К-сть: ${item.quantity}`);

          for (const ing of recipe) {
            const totalDeduction = ing.amount * item.quantity;

            // Виконуємо списання в базі інгредієнтів
            const updatedIngredient = await Ingredient.findOneAndUpdate(
              { name: ing.name },
              { $inc: { quantity: -totalDeduction } },
              { new: true }
            );

            if (updatedIngredient) {
              console.log(
                `    ✅ Списано: ${ing.name} (-${totalDeduction.toFixed(3)}). Залишок: ${updatedIngredient.quantity.toFixed(3)}`
              );
            } else {
              console.error(
                `    ⚠️ ПОМИЛКА: Інгредієнт "${ing.name}" не знайдено в базі!`
              );
            }
          }
        } else {
          console.warn(
            `    ℹ️ Рецепт для "${itemName}" не знайдено в списку RECIPES`
          );
        }
      }
      console.log(`--- Списання завершено ---\n`);
    }

    // 3. ОНОВЛЮЄМО ЗАМОВЛЕННЯ (статус та оплату) ПІСЛЯ СПИСАННЯ
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: { status, isPaid } },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('❌ Помилка оновлення замовлення:', error);
    res.status(500).json({ message: 'Помилка сервера при оновленні' });
  }
});

/**
 * GET: Аналітика продажів за датою
 */
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
          _id: '$items.name.uk',
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
    console.error('❌ Помилка аналітики:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

/**
 * GET: Всі активні замовлення
 */
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $in: ['new', 'preparing', 'ready'] },
    }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('❌ Помилка завантаження:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

/**
 * DELETE: Скасування замовлення
 */
router.delete('/:id', async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, { status: 'cancelled' });
    res.status(200).json({ message: 'Замовлення скасовано' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка скасування' });
  }
});

export default router;
