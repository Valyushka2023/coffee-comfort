import Booking from '../models/BookingModel.js';
import { sendEmail } from '../config/sendEmail.js';
import { generateBookingEmailHtml } from '../utils/emailTemplates.js';

// Створюємо logger вручну
const logger = {
  info: (msg, data) => console.log(msg, data || ''),
  error: (msg, err) => console.error(msg, err || ''),
};

export const createBooking = async (req, res) => {
  try {
    logger.info('[BOOKING] Отримано дані з фронтенду:', req.body);
    const { name, email, bookingStartDate, comment, phone } = req.body;

    // Валідація полів
    if (!name || !email || !bookingStartDate) {
      return res.status(400).json({
        success: false,
        message: 'Заповніть обовʼязкові поля (імʼя, email та дата)',
      });
    }

    // 1. ЗАПИС У МОНГО (Зберігаємо в базу оригінальний об'єкт дати)
    const booking = await Booking.create({
      name,
      email,
      bookingStartDate,
      comment,
      phone,
    });

    console.log('🎉 ПЕРЕМОГА! Дані в MongoDB з ID:', booking._id);

    // 2. ФОРМАТУВАННЯ ЧАСУ ДЛЯ ЛИСТА
    // Перетворюємо ISO рядок у зрозумілий формат "день.місяць.рік, години:хвилини"
    const readableDate = new Date(bookingStartDate).toLocaleString('uk-UA', {
      timeZone: 'Europe/Kyiv',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // 3. ВІДПОВІДЬ ФРОНТЕНДУ (Миттєва)
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking,
    });

    // 4. EMAIL У ФОНІ
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      // Створюємо копію даних для шаблону, замінюючи дату на відформатований рядок
      const emailData = {
        ...booking.toObject(), // Перетворюємо документ Mongoose у звичайний об'єкт
        bookingStartDate: readableDate, // Замінюємо дату на текст "18.02.2026, 22:30"
      };

      sendEmail({
        to: adminEmail,
        subject: '☕️ Нова заявка CoffeeComfort',
        html: generateBookingEmailHtml(emailData),
      })
        .then(() => logger.info('[EMAIL] Успішно надіслано адміністратору'))
        .catch(err =>
          logger.error('[EMAIL] Помилка відправки листа:', err.message)
        );
    }
  } catch (error) {
    logger.error('[BOOKING] Критична помилка контролера:', error.message);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Помилка при збереженні в базу даних',
        error: error.message,
      });
    }
  }
};
