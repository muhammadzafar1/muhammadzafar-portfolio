import mongoose from 'mongoose'

const settingsSchema = new mongoose.Schema({
  siteName: { type: String, required: true },
  logo: { type: String, default: '' },
  favicon: { type: String, default: '' },
  primaryColor: { type: String, default: '#2563EB' },
  secondaryColor: { type: String, default: '#4F46E5' },
  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' },
  metaKeywords: { type: String, default: '' },
  analyticsCode: { type: String, default: '' },
  contactEmail: { type: String, default: '' },
  contactPhone: { type: String, default: '' },
  address: { type: String, default: '' },
  googleMapUrl: { type: String, default: '' },
  copyrightText: { type: String, default: '' },
  quickLinks: [
    {
      label: { type: String, required: true },
      url: { type: String, required: true }
    }
  ]
}, { timestamps: true })

export default mongoose.models.Settings || mongoose.model('Settings', settingsSchema)
