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
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async bookingData => {
  // Використовуємо HTML для кращого вигляду або звичайний текст
  const mailOptions = {
    from: process.env.EMAIL,
    // Вкажіть пошту власника (можна через .env)
    to: process.env.ADMIN_EMAIL || process.env.EMAIL,
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
    // Якщо ви хочете використовувати гарний HTML-шаблон, додайте:
    // html: bookingData.html
  };

  // Метод sendMail (виправлено)
  return await transporter.sendMail(mailOptions);
};
