import express from 'express';
import mongoose from 'mongoose';
import Testimonial from '../models/Testimonial.js';
import { getIsConnected } from '../config/db.js';
import { defaultTestimonials } from '../data/defaultData.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
let memoryTestimonials = [...defaultTestimonials];

const autoSeedTestimonials = async () => {
  if (getIsConnected()) {
    try {
      const count = await Testimonial.countDocuments();
      if (count === 0) {
        console.log('[AUTO-SEED] Seeding default testimonials into MongoDB...');
        const cleanToInsert = defaultTestimonials.map(({ _id, ...rest }) => rest);
        await Testimonial.insertMany(cleanToInsert);
      }
    } catch (e) {
      console.warn('[AUTO-SEED TESTIMONIALS ERROR]', e.message);
    }
  }
};

// GET /api/testimonials
router.get('/', async (req, res) => {
  try {
    if (getIsConnected()) {
      await autoSeedTestimonials();
      const testimonials = await Testimonial.find().sort({ order: 1 });
      if (testimonials.length > 0) return res.json(testimonials);
    }
    res.json(memoryTestimonials);
  } catch (err) {
    res.json(memoryTestimonials);
  }
});

// POST /api/testimonials
router.post('/', protect, async (req, res) => {
  try {
    const testimonialData = { ...req.body };
    delete testimonialData._id;
    if (getIsConnected()) {
      const newTst = new Testimonial(testimonialData);
      await newTst.save();
      return res.status(201).json(newTst);
    }
    const newTst = { ...testimonialData, _id: 'tst_' + Date.now() };
    memoryTestimonials.push(newTst);
    res.status(201).json(newTst);
  } catch (err) {
    console.error('[TESTIMONIALS POST ERROR]', err);
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/testimonials/:id
router.put('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.createdAt;
    delete updateData.updatedAt;
    delete updateData.__v;

    if (getIsConnected()) {
      if (id && mongoose.Types.ObjectId.isValid(id)) {
        const updated = await Testimonial.findByIdAndUpdate(id, updateData, { new: true, runValidators: false });
        if (updated) return res.json(updated);
      }

      // Handle legacy 'tst_1', 'tst_2' IDs in MongoDB
      if (typeof id === 'string' && id.startsWith('tst_')) {
        const numIdx = parseInt(id.replace('tst_', ''), 10) - 1;
        if (!isNaN(numIdx) && numIdx >= 0) {
          const allDocs = await Testimonial.find().sort({ order: 1, _id: 1 });
          if (allDocs[numIdx]) {
            const updated = await Testimonial.findByIdAndUpdate(allDocs[numIdx]._id, updateData, { new: true, runValidators: false });
            return res.json(updated);
          }
        }
      }

      const newTst = new Testimonial(updateData);
      await newTst.save();
      return res.json(newTst);
    }

    // In Memory Mode
    let idx = memoryTestimonials.findIndex(t => t._id === id);
    if (idx === -1 && typeof id === 'string' && id.startsWith('tst_')) {
      const numIdx = parseInt(id.replace('tst_', ''), 10) - 1;
      if (numIdx >= 0 && numIdx < memoryTestimonials.length) idx = numIdx;
    }
    if (idx !== -1) {
      memoryTestimonials[idx] = { ...memoryTestimonials[idx], ...updateData, _id: memoryTestimonials[idx]._id || id };
      return res.json(memoryTestimonials[idx]);
    }
    const fallbackTestimonial = { ...updateData, _id: id || ('tst_' + Date.now()) };
    memoryTestimonials.push(fallbackTestimonial);
    res.json(fallbackTestimonial);
  } catch (err) {
    console.error('[TESTIMONIALS PUT ERROR]', err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/testimonials/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      if (id && mongoose.Types.ObjectId.isValid(id)) {
        await Testimonial.findByIdAndDelete(id);
      } else if (typeof id === 'string' && id.startsWith('tst_')) {
        const numIdx = parseInt(id.replace('tst_', ''), 10) - 1;
        if (!isNaN(numIdx) && numIdx >= 0) {
          const allDocs = await Testimonial.find().sort({ order: 1, _id: 1 });
          if (allDocs[numIdx]) {
            await Testimonial.findByIdAndDelete(allDocs[numIdx]._id);
          }
        }
      }
    }

    let memoryIdx = memoryTestimonials.findIndex(t => t._id === id);
    if (memoryIdx === -1 && typeof id === 'string' && id.startsWith('tst_')) {
      const numIdx = parseInt(id.replace('tst_', ''), 10) - 1;
      if (numIdx >= 0 && numIdx < memoryTestimonials.length) memoryIdx = numIdx;
    }
    if (memoryIdx !== -1) {
      memoryTestimonials.splice(memoryIdx, 1);
    }
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (err) {
    console.error('[TESTIMONIALS DELETE ERROR]', err);
    res.status(400).json({ message: err.message });
  }
});

export default router;
