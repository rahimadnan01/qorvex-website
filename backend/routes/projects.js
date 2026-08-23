import express from 'express';
import Project from '../models/Project.js';
import { getIsConnected } from '../config/db.js';
import { defaultProjects } from '../data/defaultData.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();
let memoryProjects = [...defaultProjects];

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    if (getIsConnected()) {
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
      const project = await Project.findOne({ slug });
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
    if (!projectData.slug) {
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
      let updated = null;
      if (id && id.length === 24) {
        updated = await Project.findByIdAndUpdate(id, updateData, { new: true, runValidators: false });
      }
      if (!updated) {
        const newProj = new Project(updateData);
        await newProj.save();
        return res.json(newProj);
      }
      return res.json(updated);
    }

    let idx = memoryProjects.findIndex(p => p._id === id);
    if (idx === -1 && memoryProjects.length > 0) {
      idx = 0;
    }
    if (idx !== -1) {
      memoryProjects[idx] = { ...memoryProjects[idx], ...updateData, _id: id };
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
      await Project.findByIdAndDelete(id);
    }
    memoryProjects = memoryProjects.filter(p => p._id !== id);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('[PROJECTS DELETE ERROR]', err);
    res.status(400).json({ message: err.message });
  }
});

export default router;
