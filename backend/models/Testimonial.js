import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  author: { type: String, required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  logoUrl: { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);
