import Education from '../models/Education.js'

export async function getEducation(req, res) {
  const education = await Education.find().sort({ order: 1 })
  res.json(education)
}

export async function createEducation(req, res) {
  const education = await Education.create(req.body)
  res.status(201).json(education)
}

export async function updateEducation(req, res) {
  const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!education) return res.status(404).json({ message: 'Education entry not found' })
  res.json(education)
}

export async function deleteEducation(req, res) {
  const education = await Education.findByIdAndDelete(req.params.id)
  if (!education) return res.status(404).json({ message: 'Education entry not found' })
  res.json({ message: 'Education entry removed' })
}
