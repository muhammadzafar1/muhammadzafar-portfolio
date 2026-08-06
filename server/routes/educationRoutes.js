import express from 'express'
import { body } from 'express-validator'
import { getEducation, createEducation, updateEducation, deleteEducation } from '../controllers/educationController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { validateRequest } from '../middlewares/validators.js'

const router = express.Router()
router.get('/', getEducation)
router.post(
  '/',
  protect,
  [body('institution').notEmpty(), body('degree').notEmpty(), body('duration').notEmpty()],
  validateRequest,
  createEducation
)
router.put('/:id', protect, updateEducation)
router.delete('/:id', protect, deleteEducation)
export default router
