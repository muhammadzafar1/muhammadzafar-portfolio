import Experience from '../models/Experience.js'

export async function getExperiences(req, res) {
  const experience = await Experience.find().sort({ order: 1 })
  res.json(experience)
}

export async function createExperience(req, res) {
  const experience = await Experience.create(req.body)
  res.status(201).json(experience)
}

export async function updateExperience(req, res) {
  const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!experience) return res.status(404).json({ message: 'Experience not found' })
  res.json(experience)
}

export async function deleteExperience(req, res) {
  const experience = await Experience.findByIdAndDelete(req.params.id)
  if (!experience) return res.status(404).json({ message: 'Experience not found' })
  res.json({ message: 'Experience removed' })
}
