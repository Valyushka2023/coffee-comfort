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

// === МАРШРУТ: Перевірка актуальності замовлень для клієнта ===
router.post('/validate-active', async (req, res) => {
  try {
    const { orderIds } = req.body;
    if (!orderIds || !Array.isArray(orderIds)) {
      return res.status(400).json({ message: 'Невірний формат даних' });
    }

    // Шукаємо замовлення, які є в списку клієнта та мають активні статуси
    const existingOrders = await Order.find({
      _id: { $in: orderIds },
    }).select('_id status');

    res.status(200).json({
      orders: existingOrders,
    });
  } catch (error) {
    console.error('❌ Помилка валідації активних замовлень:', error);
    res
      .status(500)
      .json({ message: 'Внутрішня помилка сервера при валідації' });
  }
});

// === МАРШРУТ: Отримання зайнятих слотів ===
router.get('/busy-slots', async (req, res) => {
  try {
    const MAX_ORDERS_PER_SLOT = 4; // Обмеження "5-го клієнта"

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const activeOrders = await Order.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ['new', 'preparing', 'ready'] },
      pickupTime: { $exists: true, $ne: null },
    }).select('pickupTime');

    const slotCounts = {};
    activeOrders.forEach(order => {
      const time = order.pickupTime;
      slotCounts[time] = (slotCounts[time] || 0) + 1;
    });

    const fullyBookedSlots = Object.keys(slotCounts).filter(
      time => slotCounts[time] >= MAX_ORDERS_PER_SLOT
    );

    res.status(200).json({ fullyBookedSlots });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Помилка при отриманні слотів', error: error.message });
  }
});

// === МАРШРУТ: Переведення замовлення в статус "ready" (На видачу) ===
router.patch('/:id/ready', async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Замовлення не знайдено' });
    }

    const PREPARATION_BUFFER = 10 * 60 * 1000;
    const WAITING_LIMIT = 20 * 60 * 1000;

    let expirationStartTime;

    if (
      order.pickupTime &&
      order.pickupTime.trim().toLowerCase() !== 'наразі'
    ) {
      const [hours, minutes] = order.pickupTime.split(':').map(Number);
      const scheduledDate = new Date(order.createdAt);
      scheduledDate.setHours(hours, minutes, 0, 0);
      expirationStartTime = scheduledDate;
    } else {
      const standardReadyTime = new Date(
        order.createdAt.getTime() + PREPARATION_BUFFER
      );
      const actualReadyTime = new Date();
      expirationStartTime = new Date(
        Math.max(standardReadyTime, actualReadyTime)
      );
    }

    const expirationDeadline = new Date(
      expirationStartTime.getTime() + WAITING_LIMIT
    );

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

// PATCH: Оновлення статусу, типу оплати та автоматичне списання інгредієнтів
router.patch('/:id', async (req, res) => {
  try {
    const { status, isPaid, paymentMethod } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({ message: 'Замовлення не знайдено' });

    if (status === 'completed' && order.status !== 'completed') {
      for (const item of order.items) {
        const rawName =
          typeof item.name === 'object' ? item.name?.uk : item.name;
        if (!rawName) continue;

        const itemName = rawName.replace(/\s+/g, ' ').trim();
        const recipe = RECIPES[itemName];

        if (recipe) {
          for (const ing of recipe) {
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
      { $set: { status, isPaid, paymentMethod } },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('❌ Помилка оновлення статусу/списання:', error);
    res.status(500).json({ message: 'Помилка оновлення' });
  }
});

// DELETE: Скасування/Анулювання замовлення баристою
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Розраховуємо дату повного видалення з бази: поточний час + 30 днів
    const deleteIn30Days = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const cancelledOrder = await Order.findByIdAndUpdate(
      id,
      {
        $set: {
          status: 'cancelled',
          expireAt: deleteIn30Days, // Скорочуємо термін життя анульованого замовлення до 30 днів
        },
      },
      { new: true }
    );

    if (!cancelledOrder) {
      return res.status(404).json({ message: 'Замовлення не знайдено' });
    }

    res.status(200).json({
      message:
        'Замовлення успішно скасовано. Воно видалиться з бази через 30 днів.',
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

// GET: Історія замовлень (Тепер фільтрується за діапазоном дат на сервері!)
// router.get('/history', async (req, res) => {
//   try {
//     const { startDate, endDate } = req.query;

//     // Якщо дати передані, фільтруємо за ними, якщо ні — беремо сьогодні
//     const start = startDate
//       ? startDate
//       : new Date().toISOString().split('T')[0];
//     const end = endDate ? endDate : start;

//     // Створюємо правильні UTC межі для пошуку в базі даних
//     const startPeriod = new Date(`${start}T00:00:00.000Z`);
//     const endPeriod = new Date(`${end}T23:59:59.999Z`);

//     const history = await Order.find({
//       status: 'completed',
//       isPaid: true,
//       updatedAt: { $gte: startPeriod, $lte: endPeriod }, // Пошук строго у проміжку
//     }).sort({ updatedAt: -1 });

//     res.status(200).json(history);
//   } catch (error) {
//     console.error('❌ Помилка завантаження історії:', error);
//     res.status(500).json({ message: 'Помилка завантаження історії' });
//   }
// });
// GET: Історія замовлень
router.get('/history', async (req, res) => {
  try {
    console.log('\n========== /history ==========');
    console.log('req.query =', req.query);

    const { startDate, endDate } = req.query;

    const start = startDate
      ? startDate
      : new Date().toISOString().split('T')[0];

    const end = endDate ? endDate : start;

    console.log('start =', start);
    console.log('end =', end);

    // const startPeriod = new Date(`${start}T00:00:00.000Z`);
    // const endPeriod = new Date(`${end}T23:59:59.999Z`);
    // 1. Початок дня за Києвом (00:00:00) — це 21:00:00 попереднього дня в UTC.
    // Тому передаємо зсув +03:00, і JS сам відніме 3 години для бази даних.
    const startPeriod = new Date(`${start}T00:00:00.000+03:00`);

    // 2. Кінець дня за Києвом (23:59:59) — це 20:59:59 в UTC.
    const endPeriod = new Date(`${end}T23:59:59.999+03:00`);
    console.log('startPeriod =', startPeriod);
    console.log('endPeriod =', endPeriod);

    const history = await Order.find({
      status: 'completed',
      isPaid: true,
    }).sort({ updatedAt: -1 });

    console.log('history.length =', history.length);

    history.forEach(order => {
      console.log({
        id: order._id,
        status: order.status,
        isPaid: order.isPaid,
        updatedAt: order.updatedAt,
      });
    });

    res.status(200).json(history);
  } catch (error) {
    console.error('❌ HISTORY ERROR');
    console.error(error);
    res.status(500).json({
      message: 'Помилка історії',
    });
  }
});
// GET: Аналітика (Виправлено часові пояси на чистий UTC)
// GET: Аналітика
router.get('/stats', async (req, res) => {
  try {
    console.log('\n========== /stats ==========');
    console.log('req.query =', req.query);

    const { startDate, endDate } = req.query;

    console.log('startDate =', startDate);
    console.log('endDate =', endDate);

    if (!startDate || !endDate) {
      console.log('❌ Дати не прийшли');

      return res.status(400).json({
        message: 'Необхідно вказати дату початку та кінця періоду',
      });
    }

    const startPeriod = new Date(`${startDate}T00:00:00.000Z`);
    const endPeriod = new Date(`${endDate}T23:59:59.999Z`);

    console.log('startPeriod =', startPeriod);
    console.log('endPeriod =', endPeriod);

    const [dishStats, paymentStats] = await Promise.all([
      Order.aggregate([
        {
          $match: {
            status: 'completed',
            updatedAt: {
              $gte: startPeriod,
              $lte: endPeriod,
            },
          },
        },
        { $unwind: '$items' },
        {
          $group: {
            _id: '$items.name',
            totalQuantity: {
              $sum: '$items.quantity',
            },
            totalPrice: {
              $sum: {
                $multiply: ['$items.price', '$items.quantity'],
              },
            },
          },
        },
      ]),
      Order.aggregate([
        {
          $match: {
            status: 'completed',
            updatedAt: {
              $gte: startPeriod,
              $lte: endPeriod,
            },
          },
        },
        {
          $group: {
            _id: '$paymentMethod',
            totalAmount: {
              $sum: '$totalPrice',
            },
          },
        },
      ]),
    ]);

    console.log('dishStats =', dishStats.length);
    console.log('paymentStats =', paymentStats);

    const cashData = paymentStats.find(p => p._id === 'cash');
    const cardData = paymentStats.find(p => p._id === 'card');

    res.json({
      dishes: dishStats,
      cash: cashData ? cashData.totalAmount : 0,
      card: cardData ? cardData.totalAmount : 0,
    });
  } catch (error) {
    console.error('❌ STATS ERROR');
    console.error(error);

    res.status(500).json({
      message: 'Помилка аналітики',
    });
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
