import express from 'express';
import { login, register, getUsers, deleteUser } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', protect, getUsers);
router.delete('/users/:id', protect, deleteUser);

export default router;