// import Callback from '../models/CallbackModel.js';
// import { sendEmail } from '../config/sendEmail.js';
// import { generateCallbackEmailHtml } from '../utils/emailTemplates.js';

// const logger = {
//   info: (msg, data) => console.log(`[INFO] ${msg}`, data || ''),
//   error: (msg, err) => console.error(`[ERROR] ${msg}`, err || ''),
// };

// export const createCallback = async (req, res) => {
//   try {
//     const { name, phone } = req.body;
//     logger.info('[CALLBACK] Спроба замовлення дзвінка:', { name, phone });

//     if (!name || !phone) {
//       return res
//         .status(400)
//         .json({ success: false, message: 'Заповніть всі поля' });
//     }

//     // 1. ЗАПИС У МОНГО
//     const callback = await Callback.create({ name, phone });
//     logger.info('✅ Запит збережено в MongoDB:', callback._id);

//     // 2. ВІДПОВІДЬ КЛІЄНТУ
//     res.status(201).json({
//       success: true,
//       message: 'Ми Вам перетелефонуємо!',
//     });

//     // 3. EMAIL У ФОНІ (використовуємо ваш SMTP Meta)
//     const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
//     if (adminEmail) {
//       sendEmail({
//         to: adminEmail,
//         subject: `📞 Передзвонити: ${name}`,
//         html: generateCallbackEmailHtml({ name, phone }),
//       })
//         .then(() => logger.info('[EMAIL] Сповіщення надіслано'))
//         .catch(err => logger.error('[EMAIL] Помилка відправки:', err.message));
//     }
//   } catch (error) {
//     logger.error('[CALLBACK] Помилка:', error.message);
//     if (!res.headersSent) {
//       res.status(500).json({ success: false, message: 'Помилка сервера' });
//     }
//   }
// };
// export const createCallback = async (req, res) => {
//   let callbackId = null;

//   try {
//     const { name, phone } = req.body;
//     logger.info('[CALLBACK] Нова спроба:', { name, phone });

//     // 1. ЗАПИС У МОНГО 📝
//     const callback = await Callback.create({ name, phone });
//     callbackId = callback._id;
//     logger.info('✅ Запит збережено в MongoDB:', callbackId);

//     // 2. ВІДПРАВКА EMAIL (Чекаємо на результат) 📧
//     const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
//     if (adminEmail) {
//       await sendEmail({
//         to: adminEmail,
//         subject: `📞 Передзвонити: ${name}`,
//         html: generateCallbackEmailHtml({
//           name,
//           phone,
//           status: 'new',
//           createdAt: new Date().toLocaleString('uk-UA'),
//         }),
//       });
//       logger.info('[EMAIL] Сповіщення надіслано успішно');
//     }

//     // 3. УСПІШНА ВІДПОВІДЬ ✅
//     res.status(201).json({
//       success: true,
//       message: 'Ми Вам перетелефонуємо!',
//     });
//   } catch (error) {
//     logger.error('[CALLBACK] Помилка процесу:', error.message);

//     // МЕХАНІЗМ ВІДКАТУ 🔄
//     if (callbackId && error.name !== 'ValidationError') {
//       try {
//         await Callback.findByIdAndDelete(callbackId);
//         logger.info(
//           `🧹 Запис ${callbackId} видалено (rollback) через помилку пошти`
//         );
//       } catch (deleteError) {
//         logger.error(
//           `🚨 КРИТИЧНО: Не вдалося видалити запис ${callbackId}:`,
//           deleteError.message
//         );
//       }
//     }

//     // ОБРОБКА ПОМИЛОК ВАЛІДАЦІЇ MONGOOSE
//     if (error.name === 'ValidationError') {
//       const messages = {};
//       Object.keys(error.errors).forEach(key => {
//         messages[key] = error.errors[key].message;
//       });
//       return res.status(400).json({ success: false, errors: messages });
//     }

//     // ЗАГАЛЬНА ПОМИЛКА
//     if (!res.headersSent) {
//       res.status(500).json({
//         success: false,
//         message: 'Сталася помилка. Будь ласка, спробуйте ще раз пізніше.',
//       });
//     }
//   }
// };
// export const createCallback = async (req, res) => {
//   let callbackId = null;

//   try {
//     const { name, phone } = req.body;
//     logger.info('[CALLBACK] Нова спроба:', { name, phone });

//     // 1. ЗАПИС У МОНГО 📝
//     const callback = await Callback.create({ name, phone });
//     callbackId = callback._id;
//     logger.info('✅ Запит збережено в MongoDB:', callbackId);

//     // 2. ВІДПРАВКА EMAIL (Чекаємо на результат) 📧
//     const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
//     if (adminEmail) {
//       await sendEmail({
//         to: adminEmail,
//         subject: `📞 Передзвонити: ${name}`,
//         html: generateCallbackEmailHtml({
//           name,
//           phone,
//           status: 'new',
//           createdAt: new Date().toLocaleString('uk-UA'),
//         }),
//       });
//       logger.info('[EMAIL] Сповіщення надіслано успішно');
//     }

//     // 3. УСПІШНА ВІДПОВІДЬ ✅
//     res.status(201).json({
//       success: true,
//       message: 'Ми Вам перетелефонуємо!',
//     });
//   } catch (error) {
//     logger.error('[CALLBACK] Помилка процесу:', error.message);

//     // МЕХАНІЗМ ВІДКАТУ 🔄
//     if (callbackId && error.name !== 'ValidationError') {
//       try {
//         await Callback.findByIdAndDelete(callbackId);
//         logger.info(
//           `🧹 Запис ${callbackId} видалено (rollback) через помилку пошти`
//         );
//       } catch (deleteError) {
//         logger.error(
//           `🚨 КРИТИЧНО: Не вдалося видалити запис ${callbackId}:`,
//           deleteError.message
//         );
//       }
//     }

//     // ОБРОБКА ПОМИЛОК ВАЛІДАЦІЇ MONGOOSE
//     if (error.name === 'ValidationError') {
//       const messages = {};
//       Object.keys(error.errors).forEach(key => {
//         messages[key] = error.errors[key].message;
//       });
//       return res.status(400).json({ success: false, errors: messages });
//     }

//     // ЗАГАЛЬНА ПОМИЛКА
//     if (!res.headersSent) {
//       res.status(500).json({
//         success: false,
//         message: 'Сталася помилка. Будь ласка, спробуйте ще раз пізніше.',
//       });
//     }
//   }
// };
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
    logger.info('[CALLBACK] Спроба замовлення дзвінка:', { name, phone });

    // 1. ЗАПИС У МОНГО 📋
    // Тут має спрацювати ваша схема з регулярним виразом для телефону
    const callback = await Callback.create({ name, phone });
    callbackId = callback._id;
    logger.info('✅ Запит збережено в MongoDB:', callbackId);

    // 2. ВІДПРАВКА EMAIL 📧
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
    if (adminEmail) {
      await sendEmail({
        to: adminEmail,
        subject: `📞 Передзвонити: ${name}`,
        html: generateCallbackEmailHtml({
          name,
          phone,
          status: 'new',
          createdAt: new Date().toLocaleString('uk-UA'),
        }),
      });
      logger.info('[EMAIL] Сповіщення надіслано успішно');
    }

    // 3. УСПІШНА ВІДПОВІДЬ ✅
    res.status(201).json({
      success: true,
      message: 'Ми Вам передзвонимо!',
    });
  } catch (error) {
    // 🔍 Тимчасовий лог для діагностики валідації
    console.log('--- ДІАГНОСТИКА ПОМИЛКИ ---');
    console.log('Назва помилки:', error.name);
    console.log('Деталі:', JSON.stringify(error.errors, null, 2));

    logger.error('[CALLBACK] Помилка процесу:', error.message);

    // Механізм відкату (Rollback) 🔄
    if (callbackId && error.name !== 'ValidationError') {
      try {
        await Callback.findByIdAndDelete(callbackId);
        logger.info(`🧹 Запис ${callbackId} видалено через помилку пошти`);
      } catch (deleteError) {
        logger.error(
          `🚨 КРИТИЧНО: Не вдалося видалити запис ${callbackId}:`,
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
        message: 'Помилка валідації',
        errors: messages,
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Такий запит вже існує',
      });
    }

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Сталася помилка. Будь ласка, спробуйте ще раз пізніше.',
      });
    }
  }
};
