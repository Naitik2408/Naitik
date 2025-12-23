import express from 'express';
import { getSocialLinks, addSocialLink, deleteSocialLink } from '../controllers/socialLinkController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get All Social Links
router.get('/', getSocialLinks);

// Add a New Social Link (Protected)
router.post('/', protect, addSocialLink);

// Delete a Social Link (Protected)
router.delete('/:id', protect, deleteSocialLink);

export default router;