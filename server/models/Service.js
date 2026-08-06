import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: '' },
  order: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.models.Service || mongoose.model('Service', serviceSchema)
