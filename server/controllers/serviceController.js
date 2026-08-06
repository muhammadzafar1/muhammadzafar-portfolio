import Service from '../models/Service.js'

export async function getServices(req, res) {
  const services = await Service.find().sort({ order: 1 })
  res.json(services)
}

export async function createService(req, res) {
  const service = await Service.create(req.body)
  res.status(201).json(service)
}

export async function updateService(req, res) {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!service) return res.status(404).json({ message: 'Service not found' })
  res.json(service)
}

export async function deleteService(req, res) {
  const service = await Service.findByIdAndDelete(req.params.id)
  if (!service) return res.status(404).json({ message: 'Service not found' })
  res.json({ message: 'Service removed' })
}
