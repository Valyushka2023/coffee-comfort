// import Menu from '../models/MenuModel.js';

// export const getMenu = async (req, res) => {
//   try {
//     const menuItems = await Menu.find();
//     res.status(200).json(menuItems);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: 'Помилка завантаження меню', error: error.message });
//   }
// };
import Menu from '../models/MenuModel.js';

export const getMenu = async (req, res) => {
  try {
    const menuItems = await Menu.find(); // Запит до MongoDB

    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({ message: 'Меню порожнє або не знайдене' });
    }

    res.status(200).json(menuItems);
  } catch (err) {
    console.error('❌ Помилка завантаження меню:', err.message);
    res.status(500).json({
      message: 'Помилка сервера при отриманні меню',
      error: err.message,
    });
  }
};
