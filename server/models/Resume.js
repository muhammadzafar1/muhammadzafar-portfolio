import mongoose from 'mongoose'

const resumeSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileSize: { type: Number, required: true },
  fileType: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
}, { timestamps: true })

export default mongoose.models.Resume || mongoose.model('Resume', resumeSchema)
