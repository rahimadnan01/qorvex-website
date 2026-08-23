import app from '../../backend/server.js';

export default function handler(req, res) {
  req.url = '/api/auth/login';
  return app(req, res);
}
