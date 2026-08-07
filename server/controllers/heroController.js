import Hero from '../models/Hero.js'

export async function getHero(req, res) {
  const hero = await Hero.findOne().sort({ updatedAt: -1 })
  if (!hero) return res.status(404).json({ message: 'Hero content not found' })
  res.json(hero)
}

export async function updateHero(req, res) {
  const updates = req.body
  // multer's upload.fields() populates req.files (object keyed by field name),
  // NOT req.file. Fix: read from req.files.heroImage / req.files.backgroundImage.
  if (req.files) {
    if (req.files.heroImage?.[0]) {
      updates.heroImage = `${req.protocol}://${req.get('host')}/uploads/${req.files.heroImage[0].filename}`
    }
    if (req.files.backgroundImage?.[0]) {
      updates.backgroundImage = `${req.protocol}://${req.get('host')}/uploads/${req.files.backgroundImage[0].filename}`
    }
  }
  const hero = await Hero.findOneAndUpdate({}, updates, { new: true, upsert: true })
  res.json(hero)
}

