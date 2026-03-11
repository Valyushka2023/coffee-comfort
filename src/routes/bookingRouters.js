import express from 'express';
import { createBooking } from '../controllers/bookingController.js';

const router = express.Router();

// Маршрут: POST http://localhost:5001/api/bookings
router.post('/', createBooking);

export default router;
/*******/
// import express from 'express';
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// const router = express.Router();

// // --- Налаштування Nodemailer для Brevo ---
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: parseInt(process.env.SMTP_PORT) || 587,
//   secure: false, // false для порту 587
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });

// /**
//  * Функція для відправки email
//  */
// const sendEmail = async bookingData => {
//   const mailOptions = {
//     from: process.env.SMTP_FROM,
//     to: process.env.ADMIN_EMAIL,
//     subject: `Нове бронювання: ${bookingData.name}`,
//     text: `
//       Нове замовлення від Coffee Comfort:
//       ----------------------------------
//       Ім'я клієнта: ${bookingData.name}
//       Email: ${bookingData.email}
//       Телефон: ${bookingData.phone}
//       Дата початку: ${bookingData.bookingStartDate}
//       Дата кінця: ${bookingData.bookingEndDate}
//       Коментар: ${bookingData.comment || 'Немає коментарів'}
//     `,
//   };

//   // ВИПРАВЛЕНО: метод називається sendMail
//   return transporter.sendMail(mailOptions);
// };

// // --- POST маршрут ---
// router.post('/bookings', async (req, res) => {
//   console.log('📩 Отримано запит на бронювання:', req.body);

//   try {
//     // 1. Відправляємо email
//     await sendEmail(req.body);

//     console.log('✅ Email sent to admin successfully');

//     // 2. Відповідаємо клієнту
//     res.status(200).json({
//       success: true,
//       message: 'Booking request sent successfully!',
//     });
//   } catch (error) {
//     console.error('❌ Booking Error (SMTP or Logic):', error.message);

//     // Відправляємо статус 500, щоб фронтенд перейшов у блок catch
//     res.status(500).json({
//       success: false,
//       message: 'Failed to process booking request: ' + error.message,
//     });
//   }
// });

// export default router;
/******************/
// import express from 'express';
// import { createBooking } from '../controllers/bookingController.js';

// const router = express.Router();

// // Створення нового бронювання
// router.post('/bookings', createBooking);

// // Отримати всі бронювання (за потреби можна винести в окремий контролер)
// import Booking from '../models/BookingModel.js';
// console.log('Тестове повідомлення для перевірки консолі');
// router.get('/bookings', async (req, res, next) => {
//   console.log('Тестове повідомлення для перевірки консолі');
//   try {
//     const bookings = await Booking.find();
//     res.json(bookings);
//   } catch (error) {
//     next(error);
//   }
// });

// export default router;
