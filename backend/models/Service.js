import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  iconMesh: { type: String, default: 'cube' }, // cube, knot, sphere, wireframe, particle
  techStack: [{ type: String }],
  deliverables: [{ type: String }],
  order: { type: Number, default: 0 },
  featured: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model('Service', serviceSchema);
