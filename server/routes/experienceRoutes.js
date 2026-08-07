import express from 'express'
import { body } from 'express-validator'
import { getExperiences, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { validateRequest } from '../middlewares/validators.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'

const router = express.Router()
router.get('/', asyncHandler(getExperiences))
router.post(
  '/',
  protect,
  [body('role').notEmpty(), body('company').notEmpty(), body('duration').notEmpty(), body('description').notEmpty()],
  validateRequest,
  asyncHandler(createExperience)
)
router.put('/:id', protect, asyncHandler(updateExperience))
router.delete('/:id', protect, asyncHandler(deleteExperience))
export default router

