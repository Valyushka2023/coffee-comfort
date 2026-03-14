// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// export const sendEmail = async bookingData => {
//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: 'your-email@example.com', // Ваша пошта
//     subject: `Нове бронювання: ${bookingData.name}`,
//     text: `
//       Ім'я: ${bookingData.name}
//       Електронна пошта: ${bookingData.email}
//       Телефон: ${bookingData.phone}
//       Дата початку: ${bookingData.bookingStartDate}
//       Дата кінця: ${bookingData.bookingEndDate}
//       Коментар: ${bookingData.comment}
//     `,
//   };

//   // Метод має бути sendMail (а не sendEmail)
//   return await transporter.sendMail(mailOptions);
// };
/****/
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// export const sendEmail = async bookingData => {
//   // Використовуємо HTML для кращого вигляду або звичайний текст
//   const mailOptions = {
//     from: process.env.EMAIL,
//     // Вкажіть пошту власника (можна через .env)
//     to: process.env.ADMIN_EMAIL || process.env.EMAIL,
//     subject: `☕️ Нове бронювання: ${bookingData.name} (${bookingData.selectedZone || 'Зона не обрана'})`,
//     text: `
//       Нова заявка на бронювання:
//       ---------------------------
//       Ім'я: ${bookingData.name}
//       Електронна пошта: ${bookingData.email}
//       Телефон: ${bookingData.phone}

//       ОБРАНА ЗОНА: ${bookingData.selectedZone || 'Не вказано'}

//       Дата: ${bookingData.bookingStartDate}
//       Коментар: ${bookingData.comment || '—'}
//       ---------------------------
//     `,
//     // Якщо ви хочете використовувати гарний HTML-шаблон, додайте:
//     // html: bookingData.html
//   };

//   // Метод sendMail (виправлено)
//   return await transporter.sendMail(mailOptions);
// };
/***/
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// 1. Налаштування транспорту (хто і як відправляє пошту)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Використовуємо надійний хост Gmail
  port: 465, // Порт для захищеного з'єднання SSL
  secure: true, // Використовуємо SSL (обов'язково для порту 465)
  auth: {
    user: process.env.EMAIL, // Ваша пошта Gmail
    pass: process.env.EMAIL_PASSWORD, // Тут має бути ВАШ ПАРОЛЬ ДОДАТКА (APP PASSWORD)
  },
});

// 2. Функція відправки пошти
export const sendEmail = async bookingData => {
  try {
    // Формуємо вміст листа
    const mailOptions = {
      from: process.env.EMAIL, // Адреса відправника
      to: process.env.ADMIN_EMAIL || process.env.EMAIL, // Адреса отримувача (ваша пошта)
      subject: `☕️ Нове бронювання: ${bookingData.name} (${bookingData.selectedZone || 'Зона не обрана'})`,
      text: `
        Нова заявка на бронювання:
        ---------------------------
        Ім'я: ${bookingData.name}
        Електронна пошта: ${bookingData.email}
        Телефон: ${bookingData.phone}
        
        ОБРАНА ЗОНА: ${bookingData.selectedZone || 'Не вказано'}
        
        Дата: ${bookingData.bookingStartDate}
        Коментар: ${bookingData.comment || '—'}
        ---------------------------
      `,
    };

    // Відправляємо лист
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    // Якщо сталася помилка, ми запишемо її в логи Render, щоб ви бачили причину
    console.error('❌ Email sending failed:', error);
    throw error; // Прокидаємо помилку далі, щоб контролер знав, що відправка не вдалася
  }
};
