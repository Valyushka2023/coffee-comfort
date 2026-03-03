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
  // Лог для перевірки вхідних даних з фронтенду
  console.log('1. [BACKEND] Отримано req.body:', req.body);

  try {
    // ПОМИЛКА БУЛА ТУТ: Додаємо selectedZone в список змінних
    const { name, email, bookingStartDate, comment, phone, selectedZone } =
      req.body;

    // 1. ВАЛІДАЦІЯ
    if (!name || !email || !bookingStartDate || !phone) {
      return res.status(400).json({
        success: false,
        message:
          'Будь ласка, заповніть всі обовʼязкові поля (імʼя, email, телефон та дату)',
      });
    }

    // 2. ЗАПИС У МОНГО
    // Тепер selectedZone точно потрапить у базу
    const booking = await Booking.create({
      name,
      email,
      bookingStartDate,
      comment: comment || '',
      phone,
      selectedZone: selectedZone || 'Не обрано',
    });

    logger.info('✅ Запис створено в MongoDB:', booking._id);

    // 3. ВИПРАВЛЕННЯ "INVALID DATE"
    // Створюємо об'єкт дати і перевіряємо його на валідність
    const dateObj = new Date(bookingStartDate);
    let readableDate;

    if (isNaN(dateObj.getTime())) {
      // Якщо дата прийшла в поганому форматі, залишаємо як є або ставимо заглушку
      readableDate = bookingStartDate;
      logger.error('⚠️ Отримано некоректний формат дати:', bookingStartDate);
    } else {
      // Форматуємо дату для листа (Український стандарт)
      readableDate = dateObj.toLocaleString('uk-UA', {
        timeZone: 'Europe/Kyiv',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    // 4. ВІДПОВІДЬ КЛІЄНТУ (Фронтенду)
    res.status(201).json({
      success: true,
      message: 'Бронювання створено успішно!',
      data: {
        id: booking._id,
        name: booking.name,
        date: readableDate,
      },
    });

    // 5. ВІДПРАВКА EMAIL ВЛАСНИКУ
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL;
    if (adminEmail) {
      // Створюємо копію об'єкта для листа з відформатованою датою
      const emailData = {
        ...booking.toObject(),
        bookingStartDate: readableDate, // Замінюємо ISO-дату на красиву
      };

      console.log('2. [EMAIL] Дані для шаблону листа:', emailData);

      sendEmail({
        to: adminEmail,
        subject: `☕️ Нове бронювання: ${name}`,
        html: generateBookingEmailHtml(emailData),
      })
        .then(() => logger.info('[EMAIL] Лист успішно надіслано'))
        .catch(err => logger.error('[EMAIL] Помилка відправки:', err.message));
    }
  } catch (error) {
    logger.error('[BOOKING] Критична помилка:', error.message);

    if (error.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: 'Таке бронювання вже існує' });
    }

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Помилка сервера',
        error:
          process.env.NODE_ENV === 'development' ? error.message : undefined,
      });
    }
  }
};
