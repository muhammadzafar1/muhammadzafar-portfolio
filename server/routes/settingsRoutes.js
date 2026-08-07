import express from 'express'
import { body } from 'express-validator'
import { getSettings, updateSettings } from '../controllers/settingsController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { validateRequest } from '../middlewares/validators.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'

const router = express.Router()
router.get('/', asyncHandler(getSettings))
router.put(
  '/',
  protect,
  [body('siteName').notEmpty(), body('seoTitle').notEmpty(), body('seoDescription').notEmpty()],
  validateRequest,
  asyncHandler(updateSettings)
)
export default router

