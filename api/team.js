import app from '../backend/server.js';

export default function handler(req, res) {
  const path = req.url ? req.url.replace(/^\/api\/team/, '').replace(/^\/team/, '') : '';
  req.url = '/api/team' + path;
  return app(req, res);
}
