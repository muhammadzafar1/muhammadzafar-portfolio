import express from 'express'
import { body } from 'express-validator'
import { getMessages, deleteMessage, submitMessage, markMessageRead } from '../controllers/messageController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { validateRequest } from '../middlewares/validators.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'

const router = express.Router()
router.get('/', protect, asyncHandler(getMessages))
router.post(
  '/contact',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('subject').notEmpty(),
    body('message').notEmpty()
  ],
  validateRequest,
  asyncHandler(submitMessage)
)
router.put('/:id/read', protect, asyncHandler(markMessageRead))
router.delete('/:id', protect, asyncHandler(deleteMessage))
export default router

