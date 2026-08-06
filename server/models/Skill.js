import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema({
  label: { type: String, required: true },
  category: { type: String, required: true },
  progress: { type: Number, required: true, min: 0, max: 100 },
  icon: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.models.Skill || mongoose.model('Skill', skillSchema)
