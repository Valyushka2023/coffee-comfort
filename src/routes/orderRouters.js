// import express from 'express';
// import Order from '../models/Order.js';
// import Ingredient from '../models/Ingredient.js';

// const router = express.Router();

// // Об'єкт рецептів (назви мають точно відповідати полю name.uk у БД товарів)
// const RECIPES = {
//   'Флет-вайт': [
//     { name: 'Кава в зернах (Arabica)', amount: 0.018 },
//     { name: 'Молоко', amount: 0.18 },
//     { name: 'Стаканчики 250мл', amount: 1 },
//   ],
//   Капучино: [
//     { name: 'Кава в зернах (Arabica)', amount: 0.018 },
//     { name: 'Молоко', amount: 0.2 },
//     { name: 'Стаканчики 250мл', amount: 1 },
//   ],
//   Американо: [
//     { name: 'Кава в зернах (Arabica)', amount: 0.018 },
//     { name: 'Стаканчики 110мл', amount: 1 },
//   ],
//   Латте: [
//     { name: 'Кава в зернах (Arabica)', amount: 0.018 },
//     { name: 'Молоко', amount: 0.25 },
//     { name: 'Стаканчики 340мл', amount: 1 },
//   ],
//   Мокка: [
//     { name: 'Кава в зернах (Arabica)', amount: 0.018 },
//     { name: 'Молоко', amount: 0.2 },
//     { name: 'Сироп Шоколад', amount: 1 },
//     { name: 'Стаканчики 340мл', amount: 1 },
//   ],
//   Макіато: [
//     { name: 'Кава в зернах (Arabica)', amount: 0.009 },
//     { name: 'Молоко', amount: 0.05 },
//     { name: 'Стаканчики 110мл', amount: 1 },
//   ],
//   Млинці: [{ name: 'Млинці', amount: 1 }],
//   Чізкейк: [{ name: 'Чізкейк', amount: 1 }],
//   Круасан: [{ name: 'Круасан', amount: 1 }],
//   Булочка: [{ name: 'Булочка', amount: 1 }],
//   Кекс: [{ name: 'Кекс', amount: 1 }],
//   Ватрушки: [{ name: 'Ватрушки', amount: 1 }],
//   'Сироп Карамель': [{ name: 'Сироп Карамель', amount: 1 }],
//   'Цукор в стіках': [{ name: 'Цукор в стіках', amount: 2 }],
// };

// // PATCH: Оновлення статусу, типу оплати та автоматичне списання інгредієнтів
// router.patch('/:id', async (req, res) => {
//   try {
//     const { status, isPaid, paymentMethod } = req.body; // Приймаємо метод оплати з фронтенду
//     const order = await Order.findById(req.params.id);
//     if (!order)
//       return res.status(404).json({ message: 'Замовлення не знадено' });

//     if (status === 'completed' && order.status !== 'completed') {
//       for (const item of order.items) {
//         // Очищення назви від зайвих пробілів/переносів
//         const itemName = item.name.uk.replace(/\s+/g, ' ').trim();
//         const recipe = RECIPES[itemName];

//         if (recipe) {
//           for (const ing of recipe) {
//             // РОЗРАХУНОК З ОКРУГЛЕННЯМ
//             const totalDeduction = Number(
//               (ing.amount * item.quantity).toFixed(3)
//             );

//             await Ingredient.findOneAndUpdate(
//               { 'name.uk': ing.name },
//               { $inc: { quantity: -totalDeduction } }
//             );
//           }
//         }
//       }
//     }

//     // Оновлюємо замовлення, додаючи тип оплати (cash/card) у документ БД
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.id,
//       { $set: { status, isPaid, paymentMethod } },
//       { new: true }
//     );
//     res.status(200).json(updatedOrder);
//   } catch (error) {
//     console.error('❌ Помилка оновлення статусу/списання:', error);
//     res.status(500).json({ message: 'Помилка оновлення' });
//   }
// });

// // DELETE: Скасування/Видалення замовлення
// router.delete('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedOrder = await Order.findByIdAndDelete(id);

//     if (!deletedOrder) {
//       return res
//         .status(404)
//         .json({ message: 'Замовлення не знайдено або вже видалено' });
//     }

//     res.status(200).json({
//       message: 'Замовлення успішно скасовано',
//       id,
//     });
//   } catch (error) {
//     console.error('❌ Помилка під час скасування замовлення:', error);
//     res
//       .status(500)
//       .json({ message: 'Внутрішня помилка сервера при скасуванні' });
//   }
// });

// // GET: Історія замовлень (ВИПРАВЛЕНО: Тільки завершені та оплачені чеки)
// router.get('/history', async (req, res) => {
//   try {
//     const history = await Order.find({
//       status: 'completed',
//       isPaid: true,
//     })
//       .limit(50)
//       .sort({ updatedAt: -1 });
//     res.status(200).json(history);
//   } catch (error) {
//     console.error('❌ Помилка завантаження історії:', error);
//     res.status(500).json({ message: 'Помилка завантаження історії' });
//   }
// });

// // GET: Аналітика (ВИПРАВЛЕНО: ТОЧНИЙ ЛОКАЛЬНИЙ ЧАС ДЛЯ КИЄВА)
// router.get('/stats', async (req, res) => {
//   try {
//     const { date } = req.query; // Отримуємо рядок типу "2026-06-04"
//     if (!date) return res.status(400).json({ message: 'Дата не вказана' });

//     // Примусово виставляємо часовий пояс України (+03:00 для літнього часу),
//     // щоб замовлення після 00:00 рахувалися правильним днем, а не відкатувалися назад
//     const startOfDay = new Date(`${date}T00:00:00.000+03:00`);
//     const endOfDay = new Date(`${date}T23:59:59.999+03:00`);

//     // Виконуємо запити паралельно через Promise.all
//     const [dishStats, paymentStats] = await Promise.all([
//       // 1. Агрегація страв за день
//       Order.aggregate([
//         {
//           $match: {
//             status: 'completed',
//             updatedAt: { $gte: startOfDay, $lte: endOfDay },
//           },
//         },
//         { $unwind: '$items' },
//         {
//           $group: {
//             _id: '$items.name',
//             totalQuantity: { $sum: '$items.quantity' },
//             totalPrice: {
//               $sum: { $multiply: ['$items.price', '$items.quantity'] },
//             },
//           },
//         },
//         { $sort: { totalQuantity: -1 } },
//       ]),
//       // 2. Агрегація фінансів (Готівка / Картка)
//       Order.aggregate([
//         {
//           $match: {
//             status: 'completed',
//             updatedAt: { $gte: startOfDay, $lte: endOfDay },
//           },
//         },
//         {
//           $group: {
//             _id: '$paymentMethod',
//             totalAmount: { $sum: '$totalPrice' },
//           },
//         },
//       ]),
//     ]);

//     // Знаходимо результати підрахунку для кожного методу
//     const cashData = paymentStats.find(p => p._id === 'cash');
//     const cardData = paymentStats.find(p => p._id === 'card');

//     // Віддаємо структуровану відповідь на фронтенд
//     res.status(200).json({
//       dishes: dishStats,
//       cash: cashData ? cashData.totalAmount : 0,
//       card: cardData ? cardData.totalAmount : 0,
//     });
//   } catch (error) {
//     console.error('❌ Помилка сервера в аналітиці:', error);
//     res.status(500).json({ message: 'Помилка аналітики' });
//   }
// });

// // POST: Створення замовлення
// router.post('/', async (req, res) => {
//   try {
//     const newOrder = new Order(req.body);
//     const savedOrder = await newOrder.save();
//     res.status(201).json(savedOrder);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // GET: Активні замовлення для табло бариста
// router.get('/', async (req, res) => {
//   try {
//     const orders = await Order.find({
//       status: { $in: ['new', 'preparing', 'ready'] },
//     }).sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Помилка завантаження' });
//   }
// });

// export default router;
/*--*/
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

// === НОВИЙ МАРШРУТ: Переведення замовлення в статус "ready" (На видачу) з розрахунком таймера ===
router.patch('/:id/ready', async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Шукаємо замовлення в базі даних
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Замовлення не знайдено' });
    }

    // Часові константи в мілісекундах
    const PREPARATION_BUFFER = 10 * 60 * 1000; // 10 хвилин дефолтного приготування для "на зараз"
    const WAITING_LIMIT = 20 * 60 * 1000; // 20 хвилин очікування клієнта на стійці

    let expirationStartTime;

    // 2. Визначаємо точку відліку 20-ти хвилин
    if (
      order.pickupTime &&
      order.pickupTime.trim().toLowerCase() !== 'наразі'
    ) {
      // Варіант А: Замовлення на конкретний час (наприклад, "15:30")
      const [hours, minutes] = order.pickupTime.split(':').map(Number);

      // Створюємо дату на основі дня, коли замовлення було створено
      const scheduledDate = new Date(order.createdAt);
      scheduledDate.setHours(hours, minutes, 0, 0);

      expirationStartTime = scheduledDate;
    } else {
      // Варіант Б: Замовлення "на зараз"
      const standardReadyTime = new Date(
        order.createdAt.getTime() + PREPARATION_BUFFER
      );
      const actualReadyTime = new Date(); // поточний момент натискання кнопки баристою

      // Вибираємо найбільшу дату (захист від занадто швидкого або запізнілого приготування)
      expirationStartTime = new Date(
        Math.max(standardReadyTime, actualReadyTime)
      );
    }

    // 3. Додаємо 20 хвилин очікування до розрахованої точки
    const expirationDeadline = new Date(
      expirationStartTime.getTime() + WAITING_LIMIT
    );

    // 4. Оновлюємо статус та дедлайн у замовленні
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        $set: {
          status: 'ready',
          expirationDeadline: expirationDeadline,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('❌ Помилка при розрахунку таймера видачі:', error);
    res
      .status(500)
      .json({ message: 'Внутрішня помилка сервера при переведенні на видачу' });
  }
});

// PATCH: Оновлення статусу, типу оплати та автоматичне списання інгредієнтів (наприклад, для завершення замовлення)
router.patch('/:id', async (req, res) => {
  try {
    const { status, isPaid, paymentMethod } = req.body; // Приймаємо метод оплати з фронтенду
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

    // Оновлюємо замовлення, додаючи тип оплати (cash/card) у документ БД
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { status, isPaid, paymentMethod } },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('❌ Помилка оновлення статусу/списання:', error);
    res.status(500).json({ message: 'Помилка оновлення' });
  }
});

// DELETE: Скасування/Видалення замовлення
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res
        .status(404)
        .json({ message: 'Замовлення не знайдено або вже видалено' });
    }

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

// GET: Історія замовлень (ВИПРАВЛЕНО: Тільки завершені та оплачені чеки)
router.get('/history', async (req, res) => {
  try {
    const history = await Order.find({
      status: 'completed',
      isPaid: true,
    })
      .limit(50)
      .sort({ updatedAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error('❌ Помилка завантаження історії:', error);
    res.status(500).json({ message: 'Помилка завантаження історії' });
  }
});

// GET: Аналітика (ВИПРАВЛЕНО: ТОЧНИЙ ЛОКАЛЬНИЙ ЧАС ДЛЯ КИЄВА)
router.get('/stats', async (req, res) => {
  try {
    const { date } = req.query; // Отримуємо рядок типу "2026-06-04"
    if (!date) return res.status(400).json({ message: 'Дата не вказана' });

    // Примусово виставляємо часовий пояс України (+03:00 для літнього часу),
    // щоб замовлення після 00:00 рахувалися правильним днем, а не відкатувалися назад
    const startOfDay = new Date(`${date}T00:00:00.000+03:00`);
    const endOfDay = new Date(`${date}T23:59:59.999+03:00`);

    // Виконуємо запити паралельно через Promise.all
    const [dishStats, paymentStats] = await Promise.all([
      // 1. Агрегація страв за день
      Order.aggregate([
        {
          $match: {
            status: 'completed',
            updatedAt: { $gte: startOfDay, $lte: endOfDay },
          },
        },
        { $unwind: '$items' },
        {
          $group: {
            _id: '$items.name',
            totalQuantity: { $sum: '$items.quantity' },
            totalPrice: {
              $sum: { $multiply: ['$items.price', '$items.quantity'] },
            },
          },
        },
        { $sort: { totalQuantity: -1 } },
      ]),
      // 2. Агрегація фінансів (Готівка / Картка)
      Order.aggregate([
        {
          $match: {
            status: 'completed',
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

    // Знаходимо результати підрахунку для кожного методу
    const cashData = paymentStats.find(p => p._id === 'cash');
    const cardData = paymentStats.find(p => p._id === 'card');

    // Віддаємо структуровану відповідь на фронтенд
    res.status(200).json({
      dishes: dishStats,
      cash: cashData ? cashData.totalAmount : 0,
      card: cardData ? cardData.totalAmount : 0,
    });
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
