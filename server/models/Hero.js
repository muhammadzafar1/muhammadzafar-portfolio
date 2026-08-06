import mongoose from 'mongoose'

const heroSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  heroImage: { type: String, default: '' },
  backgroundImage: { type: String, default: '' },
  buttons: [
    {
      label: { type: String, required: true },
      url: { type: String, required: true },
      style: { type: String, enum: ['primary', 'secondary'], default: 'primary' }
    }
  ],
  socialLinks: [
    {
      label: { type: String, required: true },
      icon: { type: String, required: true },
      url: { type: String, required: true }
    }
  ],
  showTechBadges: { type: Boolean, default: true },
  techBadges: [{ type: String }]
}, { timestamps: true })

export default mongoose.models.Hero || mongoose.model('Hero', heroSchema)
