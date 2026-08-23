import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Memory storage for file upload processing (5MB limit)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

const isCloudinaryConfigured = () => {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

// @route   POST /api/upload
// @desc    Upload an image (Cloudinary with base64 Data URI fallback)
// @access  Private (Admin)
router.post('/', protect, upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file uploaded' });
  }

  const file = req.file;

  if (isCloudinaryConfigured()) {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME.trim(),
        api_key: process.env.CLOUDINARY_API_KEY.trim(),
        api_secret: process.env.CLOUDINARY_API_SECRET.trim()
      });

      const cloudinaryResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'qorvex_studio_assets',
            resource_type: 'image'
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(file.buffer);
      });

      return res.json({
        url: cloudinaryResult.secure_url,
        public_id: cloudinaryResult.public_id,
        provider: 'cloudinary'
      });
    } catch (error) {
      console.warn('[CLOUDINARY UPLOAD WARNING]', error.message || error);
      // Fallback to Data URI if Cloudinary throws error (e.g. invalid cloud name/secret)
      const base64Data = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      return res.json({
        url: base64Data,
        provider: 'base64_fallback',
        warning: 'Cloudinary API call error: ' + (error.message || 'Check Cloudinary keys')
      });
    }
  }

  // Base64 Data URI fallback if Cloudinary credentials are not set
  const base64Data = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
  return res.json({
    url: base64Data,
    provider: 'base64_fallback'
  });
});

export default router;
