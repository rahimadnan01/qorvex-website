import app from '../../backend/server.js';

export default function handler(req, res) {
  req.url = '/api/auth/me';
  return app(req, res);
}
