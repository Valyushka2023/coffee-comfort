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

const RECIPES = {
  'Кава в зернах (Arabica)': [
    { name: 'Кава в зернах (Arabica)', amount: 0.018 },
  ],
  Капучино: [
    { name: 'Кава в зернах (Arabica)', amount: 0.018 },
    { name: 'Молоко 2.5%', amount: 0.2 },
  ],
  Лате: [
    { name: 'Кава в зернах (Arabica)', amount: 0.018 },
    { name: 'Молоко 2.5%', amount: 0.25 },
  ],
  'Сироп Карамель': [{ name: 'Сироп Карамель', amount: 1 }],
  'Стаканчики 250мл': [{ name: 'Стаканчики 250мл', amount: 1 }],
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
 * GET: Актуальні замовлення для бариста
 */
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({
      status: { $in: ['new', 'preparing', 'ready'] },
    }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('❌ Помилка завантаження замовлень:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

/**
 * PATCH: Оновлення статусу та автоматичне списання складу
 */
router.patch('/:id', async (req, res) => {
  try {
    const { status, isPaid } = req.body;
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Замовлення не знайдено' });
    }

    if (status === 'completed' && order.status !== 'completed') {
      console.log(`📦 Починаємо списання для замовлення #${order.orderNumber}`);
      for (const item of order.items) {
        const itemName = item.name.uk;
        const recipe = RECIPES[itemName];
        if (recipe) {
          for (const ing of recipe) {
            const totalAmountToSubtract = ing.amount * item.quantity;
            await Ingredient.findOneAndUpdate(
              { name: ing.name },
              { $inc: { quantity: -totalAmountToSubtract } }
            );
            console.log(`✅ Списано: ${ing.name} (${totalAmountToSubtract})`);
          }
        }
      }
    }

    // Оновлюємо статус в БД
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: { status, isPaid } },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('❌ Помилка оновлення:', error);
    res.status(500).json({ message: 'Помилка оновлення' });
  }
}); // <--- ТУТ була пропущена закриваюча дужка для router.patch

/**
 * GET: Історія замовлень
 */
router.get('/history', async (req, res) => {
  try {
    const history = await Order.find({ status: 'completed' })
      .limit(100)
      .sort({ updatedAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error('❌ Помилка історії:', error);
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
