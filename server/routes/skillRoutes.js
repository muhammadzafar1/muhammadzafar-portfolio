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
  [body('label').notEmpty(), body('category').notEmpty(), body('progress').isInt({ min: 0, max: 100 })],
  validateRequest,
  asyncHandler(createSkill)
)
router.put('/:id', protect, asyncHandler(updateSkill))
router.delete('/:id', protect, asyncHandler(deleteSkill))
export default router

