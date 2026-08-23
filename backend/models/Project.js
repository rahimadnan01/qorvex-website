import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  client: { type: String, default: 'Internal / Client' },
  category: { type: String, default: 'Software & Web UI' },
  summary: { type: String, default: '' },
  problem: { type: String, default: '' },
  approach: { type: String, default: '' },
  result: { type: String, default: '' },
  metrics: [{
    label: { type: String, default: '' },
    value: { type: String, default: '' }
  }],
  imageUrl: { type: String, default: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200' },
  tags: [{ type: String }],
  liveUrl: { type: String, default: '' },
  featured: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', projectSchema);
