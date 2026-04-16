import Menu from '../models/MenuModel.js';

export const getMenu = async (req, res) => {
  try {
    const menuItems = await Menu.find();

    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({ message: 'Menu is empty or not found' });
    }

    res.status(200).json(menuItems);
  } catch (err) {
    console.error('❌ Error loading menu:', err.message);
    res.status(500).json({
      message: 'Server error while retrieving menu',
      error: err.message,
    });
  }
};
