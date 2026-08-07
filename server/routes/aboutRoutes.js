import express from 'express'
import { body } from 'express-validator'
import { getAbout, updateAbout } from '../controllers/aboutController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { validateRequest } from '../middlewares/validators.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'

const router = express.Router()
router.get('/', asyncHandler(getAbout))
router.put(
  '/',
  protect,
  [body('biography').notEmpty(), body('personalInformation').isArray(), body('languages').isArray()],
  validateRequest,
  asyncHandler(updateAbout)
)
export default router

