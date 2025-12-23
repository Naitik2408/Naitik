import express from 'express';
import { getServices, addService, deleteService } from '../controllers/serviceController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get All Services
router.get('/', getServices);

// Add a New Service (Protected)
router.post('/', protect, addService);

// Delete a Service (Protected)
router.delete('/:id', protect, deleteService);

export default router;