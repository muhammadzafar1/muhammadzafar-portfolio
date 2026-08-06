import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'

const mediaSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileType: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
})

const Media = mongoose.models.Media || mongoose.model('Media', mediaSchema)

export async function getMedia(req, res) {
  const files = await Media.find().sort({ uploadedAt: -1 })
  res.json(files)
}

export async function uploadMedia(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: 'File upload required' })
  }

  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  const media = await Media.create({
    filename: req.file.filename,
    originalName: req.file.originalname,
    fileUrl,
    fileType: req.file.mimetype
  })

  res.status(201).json(media)
}

export async function replaceMedia(req, res) {
  const media = await Media.findById(req.params.id)
  if (!media) {
    return res.status(404).json({ message: 'Media item not found' })
  }
  if (!req.file) {
    return res.status(400).json({ message: 'Replacement file required' })
  }

  const oldPath = path.join(process.cwd(), 'uploads', media.filename)
  if (fs.existsSync(oldPath)) {
    fs.unlinkSync(oldPath)
  }

  media.filename = req.file.filename
  media.originalName = req.file.originalname
  media.fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  media.fileType = req.file.mimetype
  await media.save()

  res.json(media)
}

export async function deleteMedia(req, res) {
  const media = await Media.findById(req.params.id)
  if (!media) return res.status(404).json({ message: 'Media item not found' })

  const filePath = path.join(process.cwd(), 'uploads', media.filename)
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }

  await media.deleteOne()
  res.json({ message: 'Media removed' })
}
