import mongoose from 'mongoose'

const aboutSchema = new mongoose.Schema({
  biography: { type: String, required: true },
  personalInformation: [
    {
      label: { type: String, required: true },
      value: { type: String, required: true }
    }
  ],
  languages: [{ type: String }]
}, { timestamps: true })

export default mongoose.models.About || mongoose.model('About', aboutSchema)
