import Hero from '../models/Hero.js'

export async function getHero(req, res) {
  const hero = await Hero.findOne().sort({ updatedAt: -1 })
  if (!hero) return res.status(404).json({ message: 'Hero content not found' })
  res.json(hero)
}

export async function updateHero(req, res) {
  const updates = req.body
  if (req.file) {
    if (req.file.fieldname === 'heroImage') updates.heroImage = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    if (req.file.fieldname === 'backgroundImage') updates.backgroundImage = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  }
  const hero = await Hero.findOneAndUpdate({}, updates, { new: true, upsert: true })
  res.json(hero)
}
