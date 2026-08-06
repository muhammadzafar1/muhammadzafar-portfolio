import express from 'express'
import { body } from 'express-validator'
import { getExperiences, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { validateRequest } from '../middlewares/validators.js'

const router = express.Router()
router.get('/', getExperiences)
router.post(
  '/',
  protect,
  [body('role').notEmpty(), body('company').notEmpty(), body('duration').notEmpty(), body('description').notEmpty()],
  validateRequest,
  createExperience
)
router.put('/:id', protect, updateExperience)
router.delete('/:id', protect, deleteExperience)
export default router
