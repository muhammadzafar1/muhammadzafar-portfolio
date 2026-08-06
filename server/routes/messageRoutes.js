import express from 'express'
import { body } from 'express-validator'
import { getMessages, deleteMessage, submitMessage, markMessageRead } from '../controllers/messageController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { validateRequest } from '../middlewares/validators.js'

const router = express.Router()
router.get('/', protect, getMessages)
router.post(
  '/contact',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('subject').notEmpty(),
    body('message').notEmpty()
  ],
  validateRequest,
  submitMessage
)
router.put('/:id/read', protect, markMessageRead)
router.delete('/:id', protect, deleteMessage)
export default router
