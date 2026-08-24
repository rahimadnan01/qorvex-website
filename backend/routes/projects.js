import express from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import { getIsConnected } from '../config/db.js';
import { defaultProjects } from '../data/defaultData.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
let memoryProjects = [...defaultProjects];

const autoSeedProjects = async () => {
  if (getIsConnected()) {
    try {
      const count = await Project.countDocuments();
      if (count === 0) {
        console.log('[AUTO-SEED] Seeding default projects into MongoDB...');
        const cleanToInsert = defaultProjects.map(({ _id, ...rest }) => rest);
        await Project.insertMany(cleanToInsert);
      }
    } catch (e) {
      console.warn('[AUTO-SEED PROJECTS ERROR]', e.message);
    }
  }
};

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    if (getIsConnected()) {
      await autoSeedProjects();
      const projects = await Project.find().sort({ order: 1 });
      if (projects.length > 0) return res.json(projects);
    }
    res.json(memoryProjects);
  } catch (err) {
    res.json(memoryProjects);
  }
});

// GET /api/projects/:slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    if (getIsConnected()) {
      await autoSeedProjects();
      let project = null;
      if (slug && mongoose.Types.ObjectId.isValid(slug)) {
        project = await Project.findById(slug);
      }
      if (!project) {
        project = await Project.findOne({ slug });
      }
      if (project) return res.json(project);
    }
    const proj = memoryProjects.find(p => p.slug === slug || p._id === slug);
    if (proj) return res.json(proj);
    res.status(404).json({ message: 'Project not found' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST /api/projects
router.post('/', protect, async (req, res) => {
  try {
    const projectData = { ...req.body };
    delete projectData._id;
    if (!projectData.slug && projectData.title) {
      projectData.slug = projectData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    if (getIsConnected()) {
      const newProj = new Project(projectData);
      await newProj.save();
      return res.status(201).json(newProj);
    }
    const newProj = { ...projectData, _id: 'proj_' + Date.now() };
    memoryProjects.push(newProj);
    res.status(201).json(newProj);
  } catch (err) {
    console.error('[PROJECTS POST ERROR]', err);
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/projects/:id
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
        const updated = await Project.findByIdAndUpdate(id, updateData, { new: true, runValidators: false });
        if (updated) return res.json(updated);
      }

      // Handle legacy 'proj_1', 'proj_2' IDs in MongoDB
      if (typeof id === 'string' && id.startsWith('proj_')) {
        const numIdx = parseInt(id.replace('proj_', ''), 10) - 1;
        if (!isNaN(numIdx) && numIdx >= 0) {
          const allDocs = await Project.find().sort({ order: 1, _id: 1 });
          if (allDocs[numIdx]) {
            const updated = await Project.findByIdAndUpdate(allDocs[numIdx]._id, updateData, { new: true, runValidators: false });
            return res.json(updated);
          }
        }
      }

      if (updateData.slug) {
        const updated = await Project.findOneAndUpdate({ slug: updateData.slug }, updateData, { new: true });
        if (updated) return res.json(updated);
      }

      const newProj = new Project(updateData);
      await newProj.save();
      return res.json(newProj);
    }

    // In Memory Mode
    let idx = memoryProjects.findIndex(p => p._id === id || p.slug === updateData.slug);
    if (idx === -1 && typeof id === 'string' && id.startsWith('proj_')) {
      const numIdx = parseInt(id.replace('proj_', ''), 10) - 1;
      if (numIdx >= 0 && numIdx < memoryProjects.length) idx = numIdx;
    }
    if (idx !== -1) {
      memoryProjects[idx] = { ...memoryProjects[idx], ...updateData, _id: memoryProjects[idx]._id || id };
      return res.json(memoryProjects[idx]);
    }
    const fallbackProj = { ...updateData, _id: id || ('proj_' + Date.now()) };
    memoryProjects.push(fallbackProj);
    res.json(fallbackProj);
  } catch (err) {
    console.error('[PROJECTS PUT ERROR]', err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/projects/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    if (getIsConnected()) {
      if (id && mongoose.Types.ObjectId.isValid(id)) {
        await Project.findByIdAndDelete(id);
      } else if (typeof id === 'string' && id.startsWith('proj_')) {
        const numIdx = parseInt(id.replace('proj_', ''), 10) - 1;
        if (!isNaN(numIdx) && numIdx >= 0) {
          const allDocs = await Project.find().sort({ order: 1, _id: 1 });
          if (allDocs[numIdx]) {
            await Project.findByIdAndDelete(allDocs[numIdx]._id);
          }
        }
      }
    }

    let memoryIdx = memoryProjects.findIndex(p => p._id === id);
    if (memoryIdx === -1 && typeof id === 'string' && id.startsWith('proj_')) {
      const numIdx = parseInt(id.replace('proj_', ''), 10) - 1;
      if (numIdx >= 0 && numIdx < memoryProjects.length) memoryIdx = numIdx;
    }
    if (memoryIdx !== -1) {
      memoryProjects.splice(memoryIdx, 1);
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('[PROJECTS DELETE ERROR]', err);
    res.status(400).json({ message: err.message });
  }
});

export default router;
