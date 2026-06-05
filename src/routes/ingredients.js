import express from 'express';
import Ingredient from '../models/Ingredient.js';

const router = express.Router();

// 1. GET: Отримати весь список складу
router.get('/', async (req, res) => {
  try {
    const list = await Ingredient.find();
    res.status(200).json(list);
  } catch (error) {
    console.error('❌ Помилка сервера при отриманні складу:', error);
    // Замість українського тексту повертаємо код помилки
    res.status(500).json({ message: 'FETCH_INGREDIENTS_FAILED' });
  }
});

// 2. PATCH: Зміна кількості (+1 / -1 або ручне введення)
router.patch('/:id', async (req, res) => {
  try {
    const { quantity } = req.body;

    if (typeof quantity !== 'number' || quantity < 0) {
      // Валідація кількості
      return res.status(400).json({ message: 'INVALID_QUANTITY' });
    }

    // Округляємо до 3 знаків (для грамів, мілілітрів тощо)
    const rounded = Number(quantity.toFixed(3));

    const updatedItem = await Ingredient.findByIdAndUpdate(
      req.params.id,
      { quantity: rounded },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      // Якщо інгредієнт видалили або ID невірний
      return res.status(404).json({ message: 'INGREDIENT_NOT_FOUND' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('❌ Помилка сервера при оновленні складу:', error);
    // Помилка під час оновлення в базі
    res.status(500).json({ message: 'UPDATE_INGREDIENT_FAILED' });
  }
});

export default router;
