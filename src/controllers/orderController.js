import Order from '../models/Order.js';

export const getBusyTimeSlots = async (req, res) => {
  try {
    const MAX_ORDERS_PER_SLOT = 4; // Обмеження "5-го клієнта"

    // Беремо початок і кінець поточного дня
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Шукаємо активні замовлення на сьогодні
    const activeOrders = await Order.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
      status: { $in: ['new', 'preparing', 'ready'] }, // Виконані/скасовані не рахуємо
      pickupTime: { $exists: true, $ne: null },
    }).select('pickupTime');

    // Рахуємо кількість замовлень на кожен тайм-слот
    const slotCounts = {};
    activeOrders.forEach(order => {
      const time = order.pickupTime; // Наприклад "14:30"
      slotCounts[time] = (slotCounts[time] || 0) + 1;
    });

    // Фільтруємо і залишаємо тільки ті слоти, де ліміт вичерпано
    const fullyBookedSlots = Object.keys(slotCounts).filter(
      time => slotCounts[time] >= MAX_ORDERS_PER_SLOT
    );

    // Повертаємо масив рядків із заблокованим часом, наприклад: ["08:40", "09:00"]
    res.status(200).json({ fullyBookedSlots });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Помилка при отриманні слотів', error: error.message });
  }
};
