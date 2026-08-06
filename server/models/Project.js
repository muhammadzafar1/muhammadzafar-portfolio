import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: '' },
  images: [{ type: String }],
  technologies: [{ type: String, required: true }],
  github: { type: String, required: true },
  liveDemo: { type: String, required: true },
  category: { type: String, required: true },
  featured: { type: Boolean, default: false }
}, { timestamps: true })

export default mongoose.models.Project || mongoose.model('Project', projectSchema)
