import express from 'express'
import { body } from 'express-validator'
import { login } from '../controllers/authController.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import { validateRequest } from '../middlewares/validators.js'

const router = express.Router()
router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('A valid email is required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validateRequest,
  asyncHandler(login)
)
export default router

