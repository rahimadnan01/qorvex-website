import app from '../backend/server.js';

export default function handler(req, res) {
  const path = req.url ? req.url.replace(/^\/api\/services/, '').replace(/^\/services/, '') : '';
  req.url = '/api/services' + path;
  return app(req, res);
}
