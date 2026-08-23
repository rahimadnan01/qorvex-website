import express from 'express';
import TeamMember from '../models/TeamMember.js';
import { getIsConnected } from '../config/db.js';
import { defaultTeam } from '../data/defaultData.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
let memoryTeam = [...defaultTeam];

// GET /api/team
router.get('/', async (req, res) => {
  try {
    if (getIsConnected()) {
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
      let updated = null;
      if (id && id.length === 24) {
        updated = await TeamMember.findByIdAndUpdate(id, updateData, { new: true, runValidators: false });
      }
      if (!updated) {
        const newMember = new TeamMember(updateData);
        await newMember.save();
        return res.json(newMember);
      }
      return res.json(updated);
    }

    let idx = memoryTeam.findIndex(t => t._id === id);
    if (idx === -1 && memoryTeam.length > 0) {
      idx = 0;
    }
    if (idx !== -1) {
      memoryTeam[idx] = { ...memoryTeam[idx], ...updateData, _id: id };
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
      await TeamMember.findByIdAndDelete(id);
    }
    memoryTeam = memoryTeam.filter(t => t._id !== id);
    res.json({ message: 'Team member deleted successfully' });
  } catch (err) {
    console.error('[TEAM DELETE ERROR]', err);
    res.status(400).json({ message: err.message });
  }
});

export default router;
