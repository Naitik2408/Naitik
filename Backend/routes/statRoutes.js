import express from 'express';
import { getStats, updateStats } from '../controllers/statController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get Stats
router.get('/', getStats);

// Update Stats (Protected)
router.put('/', protect, updateStats);

export default router;