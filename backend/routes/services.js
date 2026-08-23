import express from 'express';
import Service from '../models/Service.js';
import { getIsConnected } from '../config/db.js';
import { defaultServices } from '../data/defaultData.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
let memoryServices = [...defaultServices];

// GET /api/services
router.get('/', async (req, res) => {
  try {
    if (getIsConnected()) {
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
    if (!serviceData.slug) {
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
      let updated = null;
      if (id && id.length === 24) {
        updated = await Service.findByIdAndUpdate(id, updateData, { new: true, runValidators: false });
      }
      if (!updated) {
        const newSrv = new Service(updateData);
        await newSrv.save();
        return res.json(newSrv);
      }
      return res.json(updated);
    }

    let idx = memoryServices.findIndex(s => s._id === id);
    if (idx === -1 && memoryServices.length > 0) {
      idx = 0;
    }
    if (idx !== -1) {
      memoryServices[idx] = { ...memoryServices[idx], ...updateData, _id: id };
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
      await Service.findByIdAndDelete(id);
    }
    memoryServices = memoryServices.filter(s => s._id !== id);
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error('[SERVICES DELETE ERROR]', err);
    res.status(400).json({ message: err.message });
  }
});

export default router;
