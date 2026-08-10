import Skill from '../models/Skill.js'

export async function getSkills(req, res) {
  const skills = await Skill.find().sort({ order: 1, label: 1 })
  res.json(skills)
}

export async function createSkill(req, res) {
  const rawName = req.body.name || req.body.label
  const category = (req.body.category || '').trim()
  const icon = (req.body.icon || '').trim()
  const label = rawName ? rawName.trim() : ''

  if (!label) {
    return res.status(400).json({ message: 'Skill name is required.' })
  }

  if (!category) {
    return res.status(400).json({ message: 'Skill category is required.' })
  }

  const duplicate = await Skill.findOne({ label: { $regex: `^${label}$`, $options: 'i' } })
  if (duplicate) {
    return res.status(400).json({ message: 'A skill with this name already exists.' })
  }

  const skill = await Skill.create({ label, category, icon })
  res.status(201).json(skill)
}

export async function updateSkill(req, res) {
  const updates = { ...req.body }
  if (updates.name) {
    updates.label = updates.name.trim()
    delete updates.name
  }

  const skill = await Skill.findByIdAndUpdate(req.params.id, updates, { new: true })
  if (!skill) return res.status(404).json({ message: 'Skill not found' })
  res.json(skill)
}

export async function deleteSkill(req, res) {
  const skill = await Skill.findByIdAndDelete(req.params.id)
  if (!skill) return res.status(404).json({ message: 'Skill not found' })
  res.status(200).json({ message: 'Skill removed' })
}
