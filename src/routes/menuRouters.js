// import express from 'express';
// import { getMenu } from '../controllers/menuController.js';

// const router = express.Router();

// // Маршрут: GET http://localhost:5001/api/menu
// router.get('/', getMenu);

// export default router;
// import express from 'express';
// import Menu from '../models/MenuModel.js';

// const router = express.Router();

// // GET: Отримати все меню
// router.get('/menu', async (req, res) => {
//   try {
//     const menuItems = await Menu.find(); // Запит до MongoDB

//     if (!menuItems || menuItems.length === 0) {
//       return res.status(404).json({ message: 'Меню порожнє або не знайдене' });
//     }

//     res.status(200).json(menuItems);
//   } catch (err) {
//     console.error('❌ Помилка завантаження меню:', err.message);
//     res.status(500).json({
//       message: 'Помилка сервера при отриманні меню',
//       error: err.message,
//     });
//   }
// });

// export default router;
import express from 'express';
import { getMenu } from '../controllers/menuController.js';

const router = express.Router();

// Маршрут став набагато чистішим
router.get('/', getMenu); // Тепер буде працювати http://localhost:5001/api/menu

export default router;
