// import Booking from '../models/BookingModel.js';
// import { sendEmail } from '../config/sendEmail.js';
// import { generateBookingEmailHtml } from '../utils/emailTemplates.js';

// // Створюємо logger вручну
// const logger = {
//   info: (msg, data) => console.log(msg, data || ''),
//   error: (msg, err) => console.error(msg, err || ''),
// };

// export const createBooking = async (req, res) => {
//   try {
//     logger.info('[BOOKING] Отримано дані з фронтенду:', req.body);
//     const { name, email, bookingStartDate, comment, phone } = req.body;

//     // Валідація полів
//     if (!name || !email || !bookingStartDate) {
//       return res.status(400).json({
//         success: false,
//         message: 'Заповніть обовʼязкові поля (імʼя, email та дата)',
//       });
//     }

//     // 1. ЗАПИС У МОНГО (Зберігаємо в базу оригінальний об'єкт дати)
//     const booking = await Booking.create({
//       name,
//       email,
//       bookingStartDate,
//       comment,
//       phone,
//     });

//     console.log('🎉 ПЕРЕМОГА! Дані в MongoDB з ID:', booking._id);

//     // 2. ФОРМАТУВАННЯ ЧАСУ ДЛЯ ЛИСТА
//     // Перетворюємо ISO рядок у зрозумілий формат "день.місяць.рік, години:хвилини"
//     const readableDate = new Date(bookingStartDate).toLocaleString('uk-UA', {
//       timeZone: 'Europe/Kyiv',
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });

//     // 3. ВІДПОВІДЬ ФРОНТЕНДУ (Миттєва)
//     res.status(201).json({
//       success: true,
//       message: 'Booking created successfully',
//       data: booking,
//     });

//     // 4. EMAIL У ФОНІ
//     const adminEmail = process.env.ADMIN_EMAIL;
//     if (adminEmail) {
//       // Створюємо копію даних для шаблону, замінюючи дату на відформатований рядок
//       const emailData = {
//         ...booking.toObject(), // Перетворюємо документ Mongoose у звичайний об'єкт
//         bookingStartDate: readableDate, // Замінюємо дату на текст "18.02.2026, 22:30"
//       };

//       sendEmail({
//         to: adminEmail,
//         subject: '☕️ Нова заявка CoffeeComfort',
//         html: generateBookingEmailHtml(emailData),
//       })
//         .then(() => logger.info('[EMAIL] Успішно надіслано адміністратору'))
//         .catch(err =>
//           logger.error('[EMAIL] Помилка відправки листа:', err.message)
//         );
//     }
//   } catch (error) {
//     logger.error('[BOOKING] Критична помилка контролера:', error.message);
//     if (!res.headersSent) {
//       res.status(500).json({
//         success: false,
//         message: 'Помилка при збереженні в базу даних',
//         error: error.message,
//       });
//     }
//   }
// };
import Booking from '../models/BookingModel.js';
import { sendEmail } from '../config/sendEmail.js';
import { generateBookingEmailHtml } from '../utils/emailTemplates.js';

const logger = {
  info: (msg, data) => console.log(`[INFO] ${msg}`, data || ''),
  error: (msg, err) => console.error(`[ERROR] ${msg}`, err || ''),
};

export const createBooking = async (req, res) => {
  try {
    const { name, email, bookingStartDate, comment, phone } = req.body;
    logger.info('[BOOKING] Спроба створення бронювання:', {
      name,
      email,
      bookingStartDate,
    });

    // 1. ПОКРАЩЕНА ВАЛІДАЦІЯ
    if (!name || !email || !bookingStartDate || !phone) {
      return res.status(400).json({
        success: false,
        message:
          'Будь ласка, заповніть всі обовʼязкові поля (імʼя, email, телефон та дату)',
      });
    }

    // Проста перевірка формату email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: 'Невірний формат email' });
    }

    // 2. ЗАПИС У МОНГО
    const booking = await Booking.create({
      name,
      email,
      bookingStartDate,
      comment: comment || '',
      phone,
    });

    logger.info('✅ Дані успішно збережено в MongoDB:', booking._id);

    // 3. ПІДГОТОВКА ДАНИХ ДЛЯ EMAIL
    const readableDate = new Date(bookingStartDate).toLocaleString('uk-UA', {
      timeZone: 'Europe/Kyiv',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // 4. МИТТЄВА ВІДПОВІДЬ КЛІЄНТУ
    // Важливо відправити відповідь до того, як почнеться відправка пошти, щоб користувач не чекав
    res.status(201).json({
      success: true,
      message: 'Бронювання створено успішно! Чекайте на дзвінок.',
      data: {
        id: booking._id,
        name: booking.name,
        date: readableDate,
      },
    });

    // 5. EMAIL У ФОНІ (без await, щоб не затримувати клієнта)
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const emailData = {
        ...booking.toObject(),
        bookingStartDate: readableDate,
      };

      sendEmail({
        to: adminEmail,
        subject: `☕️ Нове бронювання: ${name}`,
        html: generateBookingEmailHtml(emailData),
      })
        .then(() => logger.info('[EMAIL] Лист адміністратору надіслано'))
        .catch(err =>
          logger.error('[EMAIL] Помилка відправки листа:', err.message)
        );
    }
  } catch (error) {
    logger.error('[BOOKING] Критична помилка:', error.message);

    // Перевірка на помилку унікальності (наприклад, якщо один email не може бронювати двічі одночасно)
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: 'Таке бронювання вже існує' });
    }

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Сталася помилка на сервері при обробці бронювання',
        error:
          process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
};
