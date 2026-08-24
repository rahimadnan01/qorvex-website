import app from '../backend/server.js';
import { connectDB } from '../backend/config/db.js';

export default async function handler(req, res) {
  // Ensure DB connection is completed before executing Express handler
  try {
    await connectDB();
  } catch (e) {
    console.warn('[VERCEL HANDLER DB CONNECT WARNING]', e.message);
  }

  // Normalize req.url so Express routes match /api prefix seamlessly on Vercel
  if (req.url && !req.url.startsWith('/api')) {
    req.url = '/api' + (req.url.startsWith('/') ? req.url : '/' + req.url);
  }
  return app(req, res);
}
