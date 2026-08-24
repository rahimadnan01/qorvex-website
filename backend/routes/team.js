import express from 'express';
import mongoose from 'mongoose';
import TeamMember from '../models/TeamMember.js';
import { getIsConnected } from '../config/db.js';
import { defaultTeam } from '../data/defaultData.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
let memoryTeam = [...defaultTeam];

const autoSeedTeam = async () => {
  if (getIsConnected()) {
    try {
      const count = await TeamMember.countDocuments();
      if (count === 0) {
        console.log('[AUTO-SEED] Seeding default team members into MongoDB...');
        const cleanToInsert = defaultTeam.map(({ _id, ...rest }) => rest);
        await TeamMember.insertMany(cleanToInsert);
      }
    } catch (e) {
      console.warn('[AUTO-SEED TEAM ERROR]', e.message);
    }
  }
};

// GET /api/team
router.get('/', async (req, res) => {
  try {
    if (getIsConnected()) {
      await autoSeedTeam();
      const team = await TeamMember.find().sort({ order: 1 });
      if (team.length > 0) return res.json(team);
    }
    res.json(memoryTeam);
  } catch (err) {
    res.json(memoryTeam);
  }
});

// POST /api/team
router.post('/', protect, async (req, res) => {
  try {
    const memberData = { ...req.body };
    delete memberData._id;
    if (getIsConnected()) {
      const newMember = new TeamMember(memberData);
      await newMember.save();
      return res.status(201).json(newMember);
    }
    const newMember = { ...memberData, _id: 'tm_' + Date.now() };
    memoryTeam.push(newMember);
    res.status(201).json(newMember);
  } catch (err) {
    console.error('[TEAM POST ERROR]', err);
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/team/:id
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
        const updated = await TeamMember.findByIdAndUpdate(id, updateData, { new: true, runValidators: false });
        if (updated) return res.json(updated);
      }

      // Handle legacy 'tm_1', 'tm_2' IDs in MongoDB
      if (typeof id === 'string' && id.startsWith('tm_')) {
        const numIdx = parseInt(id.replace('tm_', ''), 10) - 1;
        if (!isNaN(numIdx) && numIdx >= 0) {
          const allDocs = await TeamMember.find().sort({ order: 1, _id: 1 });
          if (allDocs[numIdx]) {
            const updated = await TeamMember.findByIdAndUpdate(allDocs[numIdx]._id, updateData, { new: true, runValidators: false });
            return res.json(updated);
          }
        }
      }

      const newMember = new TeamMember(updateData);
      await newMember.save();
      return res.json(newMember);
    }

    // In Memory Mode
    let idx = memoryTeam.findIndex(t => t._id === id);
    if (idx === -1 && typeof id === 'string' && id.startsWith('tm_')) {
      const numIdx = parseInt(id.replace('tm_', ''), 10) - 1;
      if (numIdx >= 0 && numIdx < memoryTeam.length) idx = numIdx;
    }
    if (idx !== -1) {
      memoryTeam[idx] = { ...memoryTeam[idx], ...updateData, _id: memoryTeam[idx]._id || id };
      return res.json(memoryTeam[idx]);
    }
    const fallbackMember = { ...updateData, _id: id || ('tm_' + Date.now()) };
    memoryTeam.push(fallbackMember);
    res.json(fallbackMember);
  } catch (err) {
    console.error('[TEAM PUT ERROR]', err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/team/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      if (id && mongoose.Types.ObjectId.isValid(id)) {
        await TeamMember.findByIdAndDelete(id);
      } else if (typeof id === 'string' && id.startsWith('tm_')) {
        const numIdx = parseInt(id.replace('tm_', ''), 10) - 1;
        if (!isNaN(numIdx) && numIdx >= 0) {
          const allDocs = await TeamMember.find().sort({ order: 1, _id: 1 });
          if (allDocs[numIdx]) {
            await TeamMember.findByIdAndDelete(allDocs[numIdx]._id);
          }
        }
      }
    }

    let memoryIdx = memoryTeam.findIndex(t => t._id === id);
    if (memoryIdx === -1 && typeof id === 'string' && id.startsWith('tm_')) {
      const numIdx = parseInt(id.replace('tm_', ''), 10) - 1;
      if (numIdx >= 0 && numIdx < memoryTeam.length) memoryIdx = numIdx;
    }
    if (memoryIdx !== -1) {
      memoryTeam.splice(memoryIdx, 1);
    }
    res.json({ message: 'Team member deleted successfully' });
  } catch (err) {
    console.error('[TEAM DELETE ERROR]', err);
    res.status(400).json({ message: err.message });
  }
});

export default router;
