import express from 'express';
import { getBlogs, getBlog, addBlog, updateBlog, deleteBlog, likeBlog, addComment, deleteComment, incrementView } from '../controllers/blogController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getBlogs);
router.get('/:id', getBlog);
router.post('/:id/like', likeBlog);
router.post('/:id/comment', addComment);
router.delete('/:id/comment/:commentId', deleteComment);
router.post('/:id/view', incrementView);

// Protected routes
router.post('/', protect, addBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);

export default router;