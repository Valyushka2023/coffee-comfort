// import Callback from '../models/CallbackModel.js';
// import nodemailer from 'nodemailer';

// export const createCallback = async (req, res) => {
//   try {
//     const { name, phone } = req.body;

//     if (!name || !phone) {
//       return res.status(400).json({ message: 'Дані відсутні' });
//     }

//     // 1. Зберігаємо в базу (це працює)
//     const newCallback = new Callback({ name, phone });
//     await newCallback.save();

//     // 2. Спроба відправити пошту
//     try {
//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS,
//         },
//       });

//       await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to: process.env.EMAIL_USER,
//         subject: '📞 Новий запит на дзвінок',
//         html: `<p>Ім'я: ${name}</p><p>Тел: ${phone}</p>`,
//       });
//     } catch (mailError) {
//       // Якщо пошта не відправилась, ми просто логуємо це,
//       // але не зупиняємо виконання, щоб клієнт отримав успіх
//       console.error('Помилка пошти (Nodemailer):', mailError.message);
//     }

//     // 3. Відправляємо успіх, навіть якщо пошта підвела (бо в базу вже зберегли)
//     res.status(201).json({ message: 'Ми Вам перетелефонуємо!' });
//   } catch (error) {
//     console.error('Критична помилка сервера:', error);
//     res.status(500).json({ message: 'Помилка на сервері' });
//   }
// };
/**** */
import Callback from '../models/CallbackModel.js';
import { sendEmail } from '../config/sendEmail.js';
import { generateCallbackEmailHtml } from '../utils/emailTemplates.js';

const logger = {
  info: (msg, data) => console.log(`[INFO] ${msg}`, data || ''),
  error: (msg, err) => console.error(`[ERROR] ${msg}`, err || ''),
};

export const createCallback = async (req, res) => {
  try {
    const { name, phone } = req.body;
    logger.info('[CALLBACK] Спроба замовлення дзвінка:', { name, phone });

    if (!name || !phone) {
      return res
        .status(400)
        .json({ success: false, message: 'Заповніть всі поля' });
    }

    // 1. ЗАПИС У МОНГО
    const callback = await Callback.create({ name, phone });
    logger.info('✅ Запит збережено в MongoDB:', callback._id);

    // 2. ВІДПОВІДЬ КЛІЄНТУ
    res.status(201).json({
      success: true,
      message: 'Ми Вам перетелефонуємо!',
    });

    // 3. EMAIL У ФОНІ (використовуємо ваш SMTP Meta)
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
    if (adminEmail) {
      sendEmail({
        to: adminEmail,
        subject: `📞 Передзвонити: ${name}`,
        html: generateCallbackEmailHtml({ name, phone }),
      })
        .then(() => logger.info('[EMAIL] Сповіщення надіслано'))
        .catch(err => logger.error('[EMAIL] Помилка відправки:', err.message));
    }
  } catch (error) {
    logger.error('[CALLBACK] Помилка:', error.message);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: 'Помилка сервера' });
    }
  }
};
