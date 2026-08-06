import Settings from '../models/Settings.js'

export async function getSettings(req, res) {
  const settings = await Settings.findOne().sort({ updatedAt: -1 })
  if (!settings) {
    return res.status(404).json({ message: 'Settings not found' })
  }
  res.json(settings)
}

export async function updateSettings(req, res) {
  const updates = req.body
  const settings = await Settings.findOneAndUpdate({}, updates, { new: true, upsert: true })
  res.json(settings)
}
