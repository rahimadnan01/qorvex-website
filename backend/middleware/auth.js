import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { getIsConnected } from '../config/db.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const jwtSecret = process.env.JWT_SECRET || 'qorvex_super_secret_jwt_key_2026_x89';
      const decoded = jwt.verify(token, jwtSecret);

      if (getIsConnected()) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        // Fallback for memory mode
        req.user = { id: decoded.id, email: decoded.email, role: decoded.role || 'admin' };
      }

      return next();
    } catch (error) {
      console.error('[AUTH MIDDLEWARE] Token verification failed:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};
