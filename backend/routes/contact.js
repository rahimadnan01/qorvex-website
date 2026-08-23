import express from 'express';
import ContactSubmission from '../models/ContactSubmission.js';
import { getIsConnected } from '../config/db.js';

const router = express.Router();
let memorySubmissions = [];

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, projectTypes, budgetRange, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }
    const submissionData = { name, email, projectTypes: projectTypes || [], budgetRange: budgetRange || '', message };

    if (getIsConnected()) {
      const submission = new ContactSubmission(submissionData);
      await submission.save();
      return res.status(201).json({ success: true, message: 'Submission received!', id: submission._id });
    }

    const submission = { ...submissionData, _id: 'sub_' + Date.now(), createdAt: new Date() };
    memorySubmissions.push(submission);
    console.log('[QORVEX CONTACT] New submission:', submission);
    res.status(201).json({ success: true, message: 'Submission received successfully (memory store)', id: submission._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/contact (for Admin review)
router.get('/', async (req, res) => {
  try {
    if (getIsConnected()) {
      const submissions = await ContactSubmission.find().sort({ createdAt: -1 });
      return res.json(submissions);
    }
    res.json(memorySubmissions);
  } catch (err) {
    res.json(memorySubmissions);
  }
});

export default router;
