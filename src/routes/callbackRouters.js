import express from 'express';
import { createCallback } from '../controllers/callbackController.js';

const router = express.Router();

router.post('/', createCallback);

export default router;
