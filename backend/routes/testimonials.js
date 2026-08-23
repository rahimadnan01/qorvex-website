import express from 'express';
import Testimonial from '../models/Testimonial.js';
import { getIsConnected } from '../config/db.js';
import { defaultTestimonials } from '../data/defaultData.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
let memoryTestimonials = [...defaultTestimonials];

// GET /api/testimonials
router.get('/', async (req, res) => {
  try {
    if (getIsConnected()) {
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
      let updated = null;
      if (id && id.length === 24) {
        updated = await Testimonial.findByIdAndUpdate(id, updateData, { new: true, runValidators: false });
      }
      if (!updated) {
        const newTst = new Testimonial(updateData);
        await newTst.save();
        return res.json(newTst);
      }
      return res.json(updated);
    }

    let idx = memoryTestimonials.findIndex(t => t._id === id);
    if (idx === -1 && memoryTestimonials.length > 0) {
      idx = 0;
    }
    if (idx !== -1) {
      memoryTestimonials[idx] = { ...memoryTestimonials[idx], ...updateData, _id: id };
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
      await Testimonial.findByIdAndDelete(id);
    }
    memoryTestimonials = memoryTestimonials.filter(t => t._id !== id);
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (err) {
    console.error('[TESTIMONIALS DELETE ERROR]', err);
    res.status(400).json({ message: err.message });
  }
});

export default router;
