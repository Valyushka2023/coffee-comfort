import express from 'express';
import Ingredient from '../models/Ingredient.js';

const router = express.Router();

// 1. GET: Отримати весь список складу
router.get('/', async (req, res) => {
  try {
    const list = await Ingredient.find();
    res.status(200).json(list);
  } catch (error) {
    console.error('Помилка сервера при отриманні складу:', error);
    res.status(500).json({ message: 'Не вдалося завантажити склад' });
  }
});

// 2. PATCH: Зміна кількості (+1 / -1 або ручне введення)
router.patch('/:id', async (req, res) => {
  try {
    const { quantity } = req.body;

    if (typeof quantity !== 'number' || quantity < 0) {
      return res.status(400).json({ message: 'Некоректна кількість' });
    }

    // Округляємо до 3 знаків (для грамів, мілілітрів тощо)
    const rounded = Number(quantity.toFixed(3));

    const updatedItem = await Ingredient.findByIdAndUpdate(
      req.params.id,
      { quantity: rounded },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Інгредієнт не знайдено' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Помилка сервера при оновленні складу:', error);
    res.status(500).json({ message: 'Не вдалося оновити кількість' });
  }
});

export default router;
