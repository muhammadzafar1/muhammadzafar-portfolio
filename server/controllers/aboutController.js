import About from '../models/About.js'

export async function getAbout(req, res) {
  const about = await About.findOne().sort({ updatedAt: -1 })
  if (!about) return res.status(404).json({ message: 'About content not found' })
  res.json(about)
}

export async function updateAbout(req, res) {
  const updates = req.body
  const about = await About.findOneAndUpdate({}, updates, { new: true, upsert: true })
  res.json(about)
}
