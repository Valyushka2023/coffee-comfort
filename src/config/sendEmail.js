import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

// Створюємо транспортер
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com', // Це обов'язково для Brevo
  port: 2525, // Це стандартний порт для SMTP
  secure: false, // Для порту 587 використовуємо false
  auth: {
    user: process.env.SMTP_USER, // Логін від Brevo (email)
    pass: process.env.SMTP_PASSWORD, // API-ключ від Brevo (не пароль від пошти!)
  },
});

// Основна функція
export const sendEmail = async ({ to, subject, html }) => {
  // Логування вхідних параметрів
  logger.info('[EMAIL] Received a request to send email:', { to, subject });

  // Перевірка параметрів
  if (!to || !subject || !html) {
    const errorMsg = `[EMAIL] Missing required parameters for sending email: ${JSON.stringify({ to, subject, html })}`;
    logger.error(errorMsg);
    throw new Error('Missing email parameters');
  }

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    html,
  };

  try {
    // Логування спроби відправити лист
    logger.info(`[EMAIL] Attempt to send email to: ${to}, topic: ${subject}`);

    const info = await transporter.sendMail(mailOptions);

    // Логування успішної відправки
    logger.info('✅ [EMAIL] Email successfully sent:', info);
  } catch (error) {
    // Логування помилки
    logger.error(
      '❌ [EMAIL] Error sending email to address: %s, error: %o',
      to,
      error
    );

    throw new Error('Email sending failed');
  }
};
