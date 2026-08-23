import mongoose from 'mongoose';

const contactSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  projectTypes: [{ type: String }],
  budgetRange: { type: String, default: '' },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'contacted', 'archived'], default: 'new' }
}, { timestamps: true });

export default mongoose.models.ContactSubmission || mongoose.model('ContactSubmission', contactSubmissionSchema);
