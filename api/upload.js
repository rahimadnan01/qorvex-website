import app from '../backend/server.js';

export default function handler(req, res) {
  req.url = '/api/upload';
  return app(req, res);
}
