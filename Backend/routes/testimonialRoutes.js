import express from 'express';
import { getTestimonials, addTestimonial, deleteTestimonial } from '../controllers/testimonialController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get All Testimonials
router.get('/', getTestimonials);

// Add a New Testimonial (Protected)
router.post('/', protect, addTestimonial);

// Delete a Testimonial (Protected)
router.delete('/:id', protect, deleteTestimonial);

export default router;