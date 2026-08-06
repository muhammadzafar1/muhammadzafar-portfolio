import express from 'express'
import { body } from 'express-validator'
import { getSettings, updateSettings } from '../controllers/settingsController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { validateRequest } from '../middlewares/validators.js'

const router = express.Router()
router.get('/', getSettings)
router.put(
  '/',
  protect,
  [body('siteName').notEmpty(), body('seoTitle').notEmpty(), body('seoDescription').notEmpty()],
  validateRequest,
  updateSettings
)
export default router
