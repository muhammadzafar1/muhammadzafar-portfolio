import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed'],
    default: 'pending'
  },
  emailError: { type: String, default: null }
}, { timestamps: true })

export default mongoose.models.Message || mongoose.model('Message', messageSchema)
