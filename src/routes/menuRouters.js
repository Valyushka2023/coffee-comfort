import express from 'express';
import { getMenu } from '../controllers/menuController.js';

const router = express.Router();

// Маршрут став набагато чистішим
router.get('/', getMenu); // Тепер буде працювати http://localhost:5001/api/menu

export default router;
