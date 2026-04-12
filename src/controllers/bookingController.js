import Booking from '../models/BookingModel.js';
import { sendEmail } from '../config/sendEmail.js';
import { generateBookingEmailHtml } from '../utils/emailTemplates.js';

export const createBooking = async (req, res) => {
  console.log('Отримані дані з фронтенду:', req.body);
  let bookingId = null;

  try {
    const { name, email, bookingStartDate, comment, phone, selectedZone } =
      req.body;

    // 1. СТВОРЕННЯ ЗАПИСУ (Валідація Mongoose спрацює тут) 📝
    const booking = await Booking.create({
      name,
      email,
      bookingStartDate,
      comment,
      phone,
      selectedZone: selectedZone || 'Не обрано',
    });

    bookingId = booking._id;

    // 2. ПІДГОТОВКА ДАТИ 📅
    const dateObj = new Date(bookingStartDate);
    const readableDate = !isNaN(dateObj.getTime())
      ? dateObj.toLocaleString('uk-UA', {
          timeZone: 'Europe/Kyiv',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : bookingStartDate;

    // 3. ВІДПРАВКА EMAIL (Чекаємо успіху) 📧
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL;
    if (adminEmail) {
      await sendEmail({
        to: adminEmail,
        subject: `☕️ Нове бронювання: ${name}`,
        html: generateBookingEmailHtml({
          ...booking.toObject(),
          bookingStartDate: readableDate,
        }),
      });
    }

    // 4. УСПІХ ✅
    res.status(201).json({
      success: true,
      message: 'Бронювання створено успішно!',
      data: { id: booking._id, name: booking.name, date: readableDate },
    });
  } catch (error) {
    // ВІДКАТ ПРИ ПОМИЛЦІ ПОШТИ 🔄
    if (bookingId && error.name !== 'ValidationError') {
      await Booking.findByIdAndDelete(bookingId);
    }
  }
};
