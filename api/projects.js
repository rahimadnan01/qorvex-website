import app from '../backend/server.js';

export default function handler(req, res) {
  const path = req.url ? req.url.replace(/^\/api\/projects/, '').replace(/^\/projects/, '') : '';
  req.url = '/api/projects' + path;
  return app(req, res);
}
