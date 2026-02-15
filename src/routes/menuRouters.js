import express from 'express';
import { getMenu } from '../controllers/menuController.js';

const router = express.Router();

// Маршрут: GET http://localhost:5001/api/menu
router.get('/', getMenu);

export default router;
