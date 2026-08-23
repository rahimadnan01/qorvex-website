import app from '../backend/server.js';

export default function handler(req, res) {
  // Normalize req.url so Express routes match /api prefix seamlessly on Vercel
  if (req.url && !req.url.startsWith('/api')) {
    req.url = '/api' + (req.url.startsWith('/') ? req.url : '/' + req.url);
  }
  return app(req, res);
}
