import express from 'express'
import { body } from 'express-validator'
import { submitContact, getMessages } from '../controllers/contactController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { validateRequest } from '../middlewares/validators.js'

const router = express.Router()
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required').escape(),
    body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('subject').trim().notEmpty().withMessage('Subject is required').escape(),
    body('message').trim().notEmpty().withMessage('Message is required').escape()
  ],
  validateRequest,
  submitContact
)
router.get('/', protect, getMessages)
export default router
