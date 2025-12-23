import express from 'express';
import { getSEO, updateSEO } from '../controllers/seoController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get SEO Settings
router.get('/', getSEO);

// Update SEO Settings (Protected)
router.put('/', protect, updateSEO);

export default router;