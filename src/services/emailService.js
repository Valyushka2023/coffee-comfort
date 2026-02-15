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
  const mailOptions = {
    from: process.env.EMAIL,
    to: 'your-email@example.com', // Ваша пошта
    subject: `Нове бронювання: ${bookingData.name}`,
    text: `
      Ім'я: ${bookingData.name}
      Електронна пошта: ${bookingData.email}
      Телефон: ${bookingData.phone}
      Дата початку: ${bookingData.bookingStartDate}
      Дата кінця: ${bookingData.bookingEndDate}
      Коментар: ${bookingData.comment}
    `,
  };

  // Метод має бути sendMail (а не sendEmail)
  return await transporter.sendMail(mailOptions);
};
