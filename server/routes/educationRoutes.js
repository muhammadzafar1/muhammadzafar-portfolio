import express from 'express'
import { body } from 'express-validator'
import { getEducation, createEducation, updateEducation, deleteEducation } from '../controllers/educationController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { validateRequest } from '../middlewares/validators.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'

const router = express.Router()
router.get('/', asyncHandler(getEducation))
router.post(
  '/',
  protect,
  [body('institution').notEmpty(), body('degree').notEmpty(), body('duration').notEmpty()],
  validateRequest,
  asyncHandler(createEducation)
)
router.put('/:id', protect, asyncHandler(updateEducation))
router.delete('/:id', protect, asyncHandler(deleteEducation))
export default router

