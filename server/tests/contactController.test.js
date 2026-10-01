import test from 'node:test'
import assert from 'node:assert/strict'
import mongoose from 'mongoose'

import Message from '../models/Message.js'
import { submitContact } from '../controllers/contactController.js'

const originalCreate = Message.create
const originalFindByIdAndUpdate = Message.findByIdAndUpdate
const originalFetch = global.fetch

process.env.RESEND_API_KEY = 'test-key'
process.env.MAIL_FROM = 'hello@example.com'
process.env.MAIL_TO = 'you@example.com'

test('submitContact responds immediately without waiting for the outbound email request', async () => {
  const messageId = new mongoose.Types.ObjectId()

  Message.create = async () => ({
    _id: messageId,
    name: 'Jane Doe',
    email: 'jane@example.com',
    subject: 'Project inquiry',
    message: 'Hi there',
    createdAt: new Date().toISOString()
  })

  Message.findByIdAndUpdate = async () => ({ _id: messageId, status: 'sent' })

  global.fetch = async () => ({
    ok: true,
    text: async () => '{"id":"email-123"}'
  })

  const req = {
    body: {
      name: 'Jane Doe',
      email: 'jane@example.com',
      subject: 'Project inquiry',
      message: 'Hi there'
    }
  }

  const res = {
    statusCode: null,
    payload: null,
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.payload = payload
      return this
    }
  }

  const start = Date.now()
  await submitContact(req, res)
  await new Promise((resolve) => setTimeout(resolve, 25))

  const elapsed = Date.now() - start

  assert.equal(res.statusCode, 200)
  assert.equal(res.payload.success, true)
  assert.ok(elapsed < 250, `Expected quick response, got ${elapsed}ms`)

  Message.create = originalCreate
  Message.findByIdAndUpdate = originalFindByIdAndUpdate
  global.fetch = originalFetch
})
