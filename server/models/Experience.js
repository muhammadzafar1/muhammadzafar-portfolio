import mongoose from 'mongoose'

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, required: true },
  location: { type: String, default: '' },
  description: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.models.Experience || mongoose.model('Experience', experienceSchema)
