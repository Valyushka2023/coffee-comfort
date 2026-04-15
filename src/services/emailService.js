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
