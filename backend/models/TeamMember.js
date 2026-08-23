import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  pillar: { type: String, enum: ['Core', 'Vision', 'Execution'], default: 'Core' },
  bio: { type: String, required: true },
  philosophy: { type: String, required: true },
  photoUrl: { type: String, required: true },
  socials: {
    linkedin: { type: String, default: '' },
    email: { type: String, default: '' },
    github: { type: String, default: '' },
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    twitter: { type: String, default: '' }
  },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.TeamMember || mongoose.model('TeamMember', teamMemberSchema);
