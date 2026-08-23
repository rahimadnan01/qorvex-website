import app from '../backend/server.js';

export default function handler(req, res) {
  req.url = '/api/health';
  return app(req, res);
}
