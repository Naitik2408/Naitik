import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import aboutRoutes from './routes/aboutRoute.js';
import socialLinkRoutes from './routes/socialLinkRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import seoRoutes from './routes/seoRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import statRoutes from './routes/statRoutes.js';
import settingRoutes from './routes/settingRoutes.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();

// Updated CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'https://your-production-frontend-domain.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/social-links', socialLinkRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/stats', statRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Add this for Vercel deployment
export default app;