import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema({
  label: { type: String, required: true },
  category: { type: String, required: true },
  icon: { type: String, default: '' },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  order: { type: Number, default: 0 }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

skillSchema.virtual('name')
  .get(function () {
    return this.label
  })
  .set(function (value) {
    this.label = value
  })

export default mongoose.models.Skill || mongoose.model('Skill', skillSchema)
