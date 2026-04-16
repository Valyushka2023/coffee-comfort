import Callback from '../models/CallbackModel.js';
import { sendEmail } from '../config/sendEmail.js';
import { generateCallbackEmailHtml } from '../utils/emailTemplates.js';

const logger = {
  info: (msg, data) => console.log(`[INFO] ${msg}`, data || ''),
  error: (msg, err) => console.error(`[ERROR] ${msg}`, err || ''),
};

export const createCallback = async (req, res) => {
  let callbackId = null;

  try {
    const { name, phone } = req.body;
    logger.info('[CALLBACK] Attempt to order a call:', { name, phone });

    // 1. ЗАПИС У МОНГО 📋
    // Тут має спрацювати ваша схема з регулярним виразом для телефону
    const callback = await Callback.create({ name, phone });
    callbackId = callback._id;
    logger.info('✅ Query saved in MongoDB:', callbackId);

    // 2. ВІДПРАВКА EMAIL 📧
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
    if (adminEmail) {
      await sendEmail({
        to: adminEmail,
        subject: `📞 Call back: ${name}`,
        html: generateCallbackEmailHtml({
          name,
          phone,
          status: 'new',
          createdAt: new Date().toLocaleString('uk-UA'),
        }),
      });
      logger.info('[EMAIL] Notification sent successfully');
    }

    // 3. УСПІШНА ВІДПОВІДЬ ✅
    res.status(201).json({
      success: true,
      message: 'We will call you back.!',
    });
  } catch (error) {
    // 🔍 Тимчасовий лог для діагностики валідації
    console.log('--- ERROR DIAGNOSTICS ---');
    console.log('Error name:', error.name);
    console.log('Details:', JSON.stringify(error.errors, null, 2));

    logger.error('[CALLBACK] Process error:', error.message);

    // Механізм відкату (Rollback) 🔄
    if (callbackId && error.name !== 'ValidationError') {
      try {
        await Callback.findByIdAndDelete(callbackId);
        logger.info(`🧹 Record ${callbackId} deleted due to mail error`);
      } catch (deleteError) {
        logger.error(
          `🚨 CRITICALLY: Failed to delete entry ${callbackId}:`,
          deleteError.message
        );
      }
    }

    // 4. ОБРОБКА ПОМИЛОК ВАЛІДАЦІЇ 🛡️
    if (error.name === 'ValidationError') {
      const messages = {};
      Object.keys(error.errors).forEach(key => {
        messages[key] = error.errors[key].message;
      });

      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages,
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Such a request already exists',
      });
    }

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'An error occurred. Please try again later.',
      });
    }
  }
};
