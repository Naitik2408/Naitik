import express from 'express';
import { getPortfolio, addProject, addSkill, deleteProject, deleteSkill } from '../controllers/portfolioController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getPortfolio);
router.post('/project', protect, addProject);
router.post('/skill', protect, addSkill);
router.delete('/project/:id', protect, deleteProject);
router.delete('/skill/:id', protect, deleteSkill);

export default router;