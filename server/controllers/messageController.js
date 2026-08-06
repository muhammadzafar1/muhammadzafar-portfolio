import Message from '../models/Message.js'

export async function submitMessage(req, res) {
  const { name, email, subject, message } = req.body
  const created = await Message.create({ name, email, subject, message })
  res.status(201).json(created)
}

export async function getMessages(req, res) {
  const messages = await Message.find().sort({ createdAt: -1 })
  res.json(messages)
}

export async function deleteMessage(req, res) {
  const message = await Message.findByIdAndDelete(req.params.id)
  if (!message) return res.status(404).json({ message: 'Message not found' })
  res.json({ message: 'Message removed' })
}

export async function markMessageRead(req, res) {
  const message = await Message.findById(req.params.id)
  if (!message) return res.status(404).json({ message: 'Message not found' })
  if (message.read) return res.json({ message: 'Message already marked as read' })
  message.read = true
  await message.save()
  res.json({ message: 'Message marked as read', data: message })
}
