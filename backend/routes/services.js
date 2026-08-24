import express from 'express';
import mongoose from 'mongoose';
import Service from '../models/Service.js';
import { getIsConnected } from '../config/db.js';
import { defaultServices } from '../data/defaultData.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
let memoryServices = [...defaultServices];

const autoSeedServices = async () => {
  if (getIsConnected()) {
    try {
      const count = await Service.countDocuments();
      if (count === 0) {
        console.log('[AUTO-SEED] Seeding default services into MongoDB...');
        const cleanToInsert = defaultServices.map(({ _id, ...rest }) => rest);
        await Service.insertMany(cleanToInsert);
      }
    } catch (e) {
      console.warn('[AUTO-SEED SERVICES ERROR]', e.message);
    }
  }
};

// GET /api/services
router.get('/', async (req, res) => {
  try {
    if (getIsConnected()) {
      await autoSeedServices();
      const services = await Service.find().sort({ order: 1 });
      if (services.length > 0) return res.json(services);
    }
    res.json(memoryServices);
  } catch (err) {
    res.json(memoryServices);
  }
});

// POST /api/services
router.post('/', protect, async (req, res) => {
  try {
    const serviceData = { ...req.body };
    delete serviceData._id;
    if (!serviceData.slug && serviceData.title) {
      serviceData.slug = serviceData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    if (getIsConnected()) {
      const newService = new Service(serviceData);
      await newService.save();
      return res.status(201).json(newService);
    }
    const newService = { ...serviceData, _id: 'srv_' + Date.now() };
    memoryServices.push(newService);
    res.status(201).json(newService);
  } catch (err) {
    console.error('[SERVICES POST ERROR]', err);
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/services/:id
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
        const updated = await Service.findByIdAndUpdate(id, updateData, { new: true, runValidators: false });
        if (updated) return res.json(updated);
      }

      // Handle legacy 'srv_1', 'srv_2' IDs in MongoDB
      if (typeof id === 'string' && id.startsWith('srv_')) {
        const numIdx = parseInt(id.replace('srv_', ''), 10) - 1;
        if (!isNaN(numIdx) && numIdx >= 0) {
          const allDocs = await Service.find().sort({ order: 1, _id: 1 });
          if (allDocs[numIdx]) {
            const updated = await Service.findByIdAndUpdate(allDocs[numIdx]._id, updateData, { new: true, runValidators: false });
            return res.json(updated);
          }
        }
      }

      if (updateData.slug) {
        const updated = await Service.findOneAndUpdate({ slug: updateData.slug }, updateData, { new: true });
        if (updated) return res.json(updated);
      }

      const newSrv = new Service(updateData);
      await newSrv.save();
      return res.json(newSrv);
    }

    // In Memory Mode
    let idx = memoryServices.findIndex(s => s._id === id || s.slug === updateData.slug);
    if (idx === -1 && typeof id === 'string' && id.startsWith('srv_')) {
      const numIdx = parseInt(id.replace('srv_', ''), 10) - 1;
      if (numIdx >= 0 && numIdx < memoryServices.length) idx = numIdx;
    }
    if (idx !== -1) {
      memoryServices[idx] = { ...memoryServices[idx], ...updateData, _id: memoryServices[idx]._id || id };
      return res.json(memoryServices[idx]);
    }
    const fallbackService = { ...updateData, _id: id || ('srv_' + Date.now()) };
    memoryServices.push(fallbackService);
    res.json(fallbackService);
  } catch (err) {
    console.error('[SERVICES PUT ERROR]', err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/services/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      if (id && mongoose.Types.ObjectId.isValid(id)) {
        await Service.findByIdAndDelete(id);
      } else if (typeof id === 'string' && id.startsWith('srv_')) {
        const numIdx = parseInt(id.replace('srv_', ''), 10) - 1;
        if (!isNaN(numIdx) && numIdx >= 0) {
          const allDocs = await Service.find().sort({ order: 1, _id: 1 });
          if (allDocs[numIdx]) {
            await Service.findByIdAndDelete(allDocs[numIdx]._id);
          }
        }
      }
    }

    let memoryIdx = memoryServices.findIndex(s => s._id === id);
    if (memoryIdx === -1 && typeof id === 'string' && id.startsWith('srv_')) {
      const numIdx = parseInt(id.replace('srv_', ''), 10) - 1;
      if (numIdx >= 0 && numIdx < memoryServices.length) memoryIdx = numIdx;
    }
    if (memoryIdx !== -1) {
      memoryServices.splice(memoryIdx, 1);
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error('[SERVICES DELETE ERROR]', err);
    res.status(400).json({ message: err.message });
  }
});

export default router;
