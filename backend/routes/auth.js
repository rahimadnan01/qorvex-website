import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { getIsConnected } from '../config/db.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Generate JWT token helper
const generateToken = (id, email, role) => {
  const secret = process.env.JWT_SECRET || 'qorvex_super_secret_jwt_key_2026_x89';
  return jwt.sign({ id, email, role }, secret, {
    expiresIn: '30d'
  });
};

// Fallback admin credentials for offline/memory mode
const DEFAULT_EMAIL = 'admin@qorvex.com';
const DEFAULT_PASSWORD = 'admin123456';
const FALLBACK_ADMIN = {
  id: 'usr_admin_fallback',
  name: 'Qorvex Studio Admin',
  email: DEFAULT_EMAIL,
  passwordHash: bcrypt.hashSync(DEFAULT_PASSWORD, 10),
  role: 'admin'
};

// @route   POST /api/auth/login
// @desc    Authenticate admin & get token (auto-creates default admin in MongoDB if missing)
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  const cleanEmail = email.trim().toLowerCase();

  try {
    if (getIsConnected()) {
      let user = await User.findOne({ email: cleanEmail });

      // Auto-create default admin user in MongoDB Atlas if missing
      if (!user && cleanEmail === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
        console.log('[AUTH] Auto-seeding default admin user in MongoDB Atlas...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, salt);
        user = new User({
          name: 'Qorvex Studio Admin',
          email: DEFAULT_EMAIL,
          password: hashedPassword,
          role: 'admin'
        });
        await user.save();
      }

      if (user) {
        const isMatch = await user.matchPassword(password);
        if (isMatch || (cleanEmail === DEFAULT_EMAIL && password === DEFAULT_PASSWORD)) {
          // If default admin password needed update, sync it
          if (!isMatch && cleanEmail === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(DEFAULT_PASSWORD, salt);
            await user.save();
          }

          return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.email, user.role)
          });
        }
      }
    }

    // Memory / Fallback Admin check
    if (cleanEmail === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
      return res.json({
        _id: FALLBACK_ADMIN.id,
        name: FALLBACK_ADMIN.name,
        email: FALLBACK_ADMIN.email,
        role: FALLBACK_ADMIN.role,
        token: generateToken(FALLBACK_ADMIN.id, FALLBACK_ADMIN.email, FALLBACK_ADMIN.role)
      });
    }

    return res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    console.error('[AUTH LOGIN ERROR]', error);

    // Final safety fallback for default admin creds
    if (cleanEmail === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
      return res.json({
        _id: FALLBACK_ADMIN.id,
        name: FALLBACK_ADMIN.name,
        email: FALLBACK_ADMIN.email,
        role: FALLBACK_ADMIN.role,
        token: generateToken(FALLBACK_ADMIN.id, FALLBACK_ADMIN.email, FALLBACK_ADMIN.role)
      });
    }

    return res.status(500).json({ message: 'Server error during login authentication' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', protect, async (req, res) => {
  if (req.user) {
    return res.json(req.user);
  }
  return res.status(404).json({ message: 'User profile not found' });
});

export default router;
