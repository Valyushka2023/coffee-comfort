// import express from 'express';
// import Order from '../models/Order.js';
// import Ingredient from '../models/Ingredient.js';

// const router = express.Router();

// // Об'єкт рецептів: назви ключів (наприклад, 'Флет-вайт')
// // мають точно відповідати полю name.uk у вашій базі товарів.
// const RECIPES = {
//   // --- НАПОЇ ---
//   'Флет-вайт': [
//     { name: 'Кава в зернах (Arabica)', amount: 0.018 }, // кг
//     { name: 'Молоко 2.5%', amount: 0.18 }, // л
//     { name: 'Стаканчики 250мл', amount: 1 }, // шт
//   ],
//   Капучино: [
//     { name: 'Кава в зернах (Arabica)', amount: 0.018 },
//     { name: 'Молоко 2.5%', amount: 0.2 },
//     { name: 'Стаканчики 250мл', amount: 1 },
//   ],
//   Американо: [
//     { name: 'Кава в зернах (Arabica)', amount: 0.018 },
//     { name: 'Стаканчики 110мл', amount: 1 },
//   ],
//   Латте: [
//     { name: 'Кава в зернах (Arabica)', amount: 0.018 },
//     { name: 'Молоко 2.5%', amount: 0.25 },
//     { name: 'Стаканчики 340мл', amount: 1 },
//   ],
//   Мокка: [
//     { name: 'Кава в зернах (Arabica)', amount: 0.018 },
//     { name: 'Молоко 2.5%', amount: 0.2 },
//     { name: 'Сироп Шоколад', amount: 1 },
//     { name: 'Стаканчики 340мл', amount: 1 },
//   ],
//   Макіато: [
//     { name: 'Кава в зернах (Arabica)', amount: 0.009 },
//     { name: 'Молоко 2.5%', amount: 0.05 },
//     { name: 'Стаканчики 110мл', amount: 1 },
//   ],

//   // --- ВИПІЧКА ---
//   Млинці: [{ name: 'Млинці', amount: 1 }],
//   Чізкейк: [{ name: 'Чізкейк', amount: 1 }],
//   Круасан: [{ name: 'Круасан', amount: 1 }],
//   Булочка: [{ name: 'Булочка', amount: 1 }],
//   Кекс: [{ name: 'Кекс', amount: 1 }],
//   Ватрушки: [{ name: 'Ватрушки', amount: 1 }],

//   // --- ДОДАТКОВО ---
//   'Сироп Карамель': [{ name: 'Сироп Карамель', amount: 1 }],
//   'Цукор в стіках': [{ name: 'Цукор в стіках', amount: 2 }],
// };

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
//       .json({ message: 'Помилка валідації', error: error.message });
//   }
// });

// /**
//  * PATCH: Оновлення статусу та списання інгредієнтів
//  */
// router.patch('/:id', async (req, res) => {
//   try {
//     const { status, isPaid } = req.body;
//     const orderId = req.params.id;

//     // 1. Знаходимо замовлення в БД
//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ message: 'Замовлення не знайдено' });
//     }

//     // 2. ЛОГІКА СПИСАННЯ
//     // Списуємо інгредієнти тільки якщо статус змінюється на 'completed' вперше
//     if (status === 'completed' && order.status !== 'completed') {
//       console.log(
//         `\n🚀 ПРОВЕДЕННЯ СПИСАННЯ для замовлення №${order.orderNumber}`
//       );

//       for (const item of order.items) {
//         // Очищаємо назву від зайвих пробілів та можливих переносів рядків
//         const itemName = item.name.uk.replace(/\s+/g, ' ').trim();
//         const recipe = RECIPES[itemName];

//         if (recipe) {
//           console.log(`📦 Товар: ${itemName}, К-сть: ${item.quantity}`);

//           for (const ing of recipe) {
//             const totalDeduction = ing.amount * item.quantity;

//             // Виконуємо списання в базі інгредієнтів
//             const updatedIngredient = await Ingredient.findOneAndUpdate(
//               { name: ing.name },
//               { $inc: { quantity: -totalDeduction } },
//               { new: true }
//             );

//             if (updatedIngredient) {
//               console.log(
//                 `    ✅ Списано: ${ing.name} (-${totalDeduction.toFixed(3)}). Залишок: ${updatedIngredient.quantity.toFixed(3)}`
//               );
//             } else {
//               console.error(
//                 `    ⚠️ ПОМИЛКА: Інгредієнт "${ing.name}" не знайдено в базі!`
//               );
//             }
//           }
//         } else {
//           console.warn(
//             `    ℹ️ Рецепт для "${itemName}" не знайдено в списку RECIPES`
//           );
//         }
//       }
//       console.log(`--- Списання завершено ---\n`);
//     }

//     // 3. ОНОВЛЮЄМО ЗАМОВЛЕННЯ (статус та оплату) ПІСЛЯ СПИСАННЯ
//     const updatedOrder = await Order.findByIdAndUpdate(
//       orderId,
//       { $set: { status, isPaid } },
//       { new: true }
//     );

//     res.status(200).json(updatedOrder);
//   } catch (error) {
//     console.error('❌ Помилка оновлення замовлення:', error);
//     res.status(500).json({ message: 'Помилка сервера при оновленні' });
//   }
// });

// /**
//  * GET: Аналітика продажів за датою
//  */
// router.get('/stats', async (req, res) => {
//   try {
//     const { date } = req.query;
//     if (!date) return res.status(400).json({ message: 'Дата не вказана' });

//     const startOfDay = new Date(date);
//     startOfDay.setHours(0, 0, 0, 0);
//     const endOfDay = new Date(date);
//     endOfDay.setHours(23, 59, 59, 999);

//     const stats = await Order.aggregate([
//       {
//         $match: {
//           status: 'completed',
//           updatedAt: { $gte: startOfDay, $lte: endOfDay },
//         },
//       },
//       { $unwind: '$items' },
//       {
//         $group: {
//           _id: '$items.name.uk',
//           totalQuantity: { $sum: '$items.quantity' },
//           totalPrice: {
//             $sum: { $multiply: ['$items.price', '$items.quantity'] },
//           },
//         },
//       },
//       { $sort: { totalQuantity: -1 } },
//     ]);
//     res.status(200).json(stats);
//   } catch (error) {
//     console.error('❌ Помилка аналітики:', error);
//     res.status(500).json({ message: 'Помилка сервера' });
//   }
// });

// /**
//  * GET: Всі активні замовлення
//  */
// router.get('/', async (req, res) => {
//   try {
//     const orders = await Order.find({
//       status: { $in: ['new', 'preparing', 'ready'] },
//     }).sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error('❌ Помилка завантаження:', error);
//     res.status(500).json({ message: 'Помилка сервера' });
//   }
// });

// /**
//  * DELETE: Скасування замовлення
//  */
// router.delete('/:id', async (req, res) => {
//   try {
//     await Order.findByIdAndUpdate(req.params.id, { status: 'cancelled' });
//     res.status(200).json({ message: 'Замовлення скасовано' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Помилка скасування' });
//   }
// });

// export default router;
/**/
import express from 'express';
import Order from '../models/Order.js';
import Ingredient from '../models/Ingredient.js';

const router = express.Router();

// Об'єкт рецептів (назви мають точно відповідати полю name.uk у БД товарів)
const RECIPES = {
  'Флет-вайт': [
    { name: 'Кава в зернах (Arabica)', amount: 0.018 },
    { name: 'Молоко 2.5%', amount: 0.18 },
    { name: 'Стаканчики 250мл', amount: 1 },
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
            // РОЗРАХУНОК З ОКРУГЛЕННЯМ: Запобігає появі хвостів на кшталт 28.900000000000002
            const totalDeduction = Number(
              (ing.amount * item.quantity).toFixed(3)
            );

            await Ingredient.findOneAndUpdate(
              { name: ing.name },
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

// GET: Аналітика
router.get('/stats', async (req, res) => {
  try {
    const { date } = req.query;
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
      { $sort: { totalQuantity: -1 } }, // Сортування від популярніших до менш популярних
    ]);
    res.status(200).json(stats);
  } catch (error) {
    console.error(error);
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
