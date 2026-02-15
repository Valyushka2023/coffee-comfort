import Menu from '../models/MenuModel.js';

export const getMenu = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Помилка завантаження меню', error: error.message });
  }
};
