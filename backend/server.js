import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import servicesRouter from './routes/services.js';
import teamRouter from './routes/team.js';
import projectsRouter from './routes/projects.js';
import testimonialsRouter from './routes/testimonials.js';
import contactRouter from './routes/contact.js';
import authRouter from './routes/auth.js';
import uploadRouter from './routes/upload.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// REST API Routes
app.use('/api/auth', authRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/services', servicesRouter);
app.use('/api/team', teamRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/contact', contactRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    studio: 'Qorvex Backend REST API',
    timestamp: new Date().toISOString()
  });
});

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`[QORVEX API] Server running on http://localhost:${PORT}`);
  });
}

export default app;
