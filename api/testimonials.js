import app from '../backend/server.js';

export default function handler(req, res) {
  const path = req.url ? req.url.replace(/^\/api\/testimonials/, '').replace(/^\/testimonials/, '') : '';
  req.url = '/api/testimonials' + path;
  return app(req, res);
}
