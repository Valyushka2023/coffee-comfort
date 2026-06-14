import Order from '../models/Order.js'; // перевірте, чи правильний шлях до моделі

// Контролер для переведення замовлення в статус "Готово / На видачу"
export const markOrderAsReady = async (req, res) => {
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
      // Беремо години та хвилини з pickupTime
      const [hours, minutes] = order.pickupTime.split(':').map(Number);

      // Створюємо дату на основі дня, коли замовлення було створено
      const scheduledDate = new Date(order.createdAt);
      scheduledDate.setHours(hours, minutes, 0, 0);

      expirationStartTime = scheduledDate;
    } else {
      // Варіант Б: Замовлення "на зараз"
      // Рахуємо стандартний час готовності (час створення + 10 хвилин буфера)
      const standardReadyTime = new Date(
        order.createdAt.getTime() + PREPARATION_BUFFER
      );
      const actualReadyTime = new Date(); // поточний момент натискання кнопки баристою

      // Вибираємо найбільшу дату (якщо бариста зробив швидше ніж за 10 хв — увімкнеться standardReadyTime)
      expirationStartTime = new Date(
        Math.max(standardReadyTime, actualReadyTime)
      );
    }

    // 3. Додаємо чисті 20 хвилин очікування до розрахованої точки
    const expirationDeadline = new Date(
      expirationStartTime.getTime() + WAITING_LIMIT
    );

    // 4. Оновлюємо статус та дедлайн у замовленні
    order.status = 'ready';
    order.expirationDeadline = expirationDeadline;

    // Зберігаємо зміни у базі даних
    await order.save();

    // Відправляємо оновлений об'єкт назад на фронтенд
    res.status(200).json({
      message: 'Замовлення успішно переведено в статус готовності',
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Внутрішня помилка сервера при оновленні статусу',
      error: error.message,
    });
  }
};
