import express from 'express';
import { getAbout, updateAbout } from '../controllers/aboutController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get About Section Data
router.get('/', getAbout);

// Update About Section Data (Protected)
router.put('/', protect, updateAbout);

export default router;