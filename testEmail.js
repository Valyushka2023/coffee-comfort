/* eslint-env node */ // <--- Додано цю директиву для визначення process та console

import dotenv from 'dotenv';
// Оновлюємо шлях, щоб він був коректним, враховуючи, що він запускається
// з кореня проєкту (якщо testEmail.js теж знаходиться в корені).
import { sendEmail } from './src/config/sendEmail.js';

dotenv.config();

const runTest = async () => {
  try {
    await sendEmail({
      to: process.env.ADMIN_EMAIL, // або введи прямо тут: 'твоя_пошта@gmail.com'
      subject: '📨 Test from sendEmail()',
      html: '<h2>This is a test sheet from real code!</h2><p>Verification successful!</p>',
    });
    console.log('✅ Test email sent successfully');
  } catch (err) {
    console.error('❌ Error sending email:', err);
  }
};

runTest();
