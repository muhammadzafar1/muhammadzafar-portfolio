import express from 'express'
import { body } from 'express-validator'
import { getSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skillController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { validateRequest } from '../middlewares/validators.js'

const router = express.Router()
router.get('/', getSkills)
router.post(
  '/',
  protect,
  [body('label').notEmpty(), body('category').notEmpty(), body('progress').isInt({ min: 0, max: 100 })],
  validateRequest,
  createSkill
)
router.put('/:id', protect, updateSkill)
router.delete('/:id', protect, deleteSkill)
export default router
