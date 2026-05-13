import express from 'express';
import Ingredient from '../models/Ingredient.js';

const router = express.Router();

// GET: Отримати всі залишки
router.get('/', async (req, res) => {
  const ingredients = await Ingredient.find();
  res.json(ingredients);
});

// PATCH: Оновити кількість
router.patch('/:id', async (req, res) => {
  const { quantity } = req.body;
  const ingredient = await Ingredient.findByIdAndUpdate(
    req.params.id,
    { quantity },
    { new: true }
  );
  res.json(ingredient);
});

export default router;
