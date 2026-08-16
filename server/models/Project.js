import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: '' },
  images: [{ type: String }],
  technologies: [{ type: String, required: true }],
  github: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  liveDemo: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  category: { type: String, default: 'Other', trim: true },
  icon: { type: String, default: 'FaCode' },
  status: { type: String, default: 'New' },
  featured: { type: Boolean, default: false }
}, { timestamps: true })

export default mongoose.models.Project || mongoose.model('Project', projectSchema)
