import express from 'express';
import Ingredient from '../models/Ingredient.js';

const router = express.Router();

// GET: Отримати всі залишки
router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (error) {
    console.error('❌ Помилка отримання складу:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// PATCH: Оновити кількість (З ВИПРАВЛЕННЯМ ОКРУГЛЕННЯ)
router.patch('/:id', async (req, res) => {
  try {
    const { quantity } = req.body;

    // Якщо прийшло число, округляємо його до 3 знаків після коми
    const roundedQuantity =
      typeof quantity === 'number' ? Number(quantity.toFixed(3)) : quantity;

    const ingredient = await Ingredient.findByIdAndUpdate(
      req.params.id,
      { quantity: roundedQuantity },
      { new: true }
    );

    if (!ingredient) {
      return res.status(404).json({ message: 'Інгредієнт не знайдено' });
    }

    res.json(ingredient);
  } catch (error) {
    console.error('❌ Помилка оновлення складу:', error);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

export default router;
