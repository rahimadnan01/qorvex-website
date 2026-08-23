import app from '../backend/server.js';

export default function handler(req, res) {
  const path = req.url ? req.url.replace(/^\/api\/contact/, '').replace(/^\/contact/, '') : '';
  req.url = '/api/contact' + path;
  return app(req, res);
}
