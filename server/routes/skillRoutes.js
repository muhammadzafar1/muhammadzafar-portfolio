import express from 'express'
import { body } from 'express-validator'
import { getSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skillController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { validateRequest } from '../middlewares/validators.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'

const router = express.Router()
router.get('/', asyncHandler(getSkills))
router.post(
  '/',
  protect,
  [
    body('name').trim().notEmpty().withMessage('Skill name is required'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('icon').optional().isString().withMessage('Icon must be a string')
  ],
  validateRequest,
  asyncHandler(createSkill)
)
router.put('/:id', protect, asyncHandler(updateSkill))
router.delete('/:id', protect, asyncHandler(deleteSkill))
export default router

