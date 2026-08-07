import express from 'express'
import { body } from 'express-validator'
import { getServices, createService, updateService, deleteService } from '../controllers/serviceController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { validateRequest } from '../middlewares/validators.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'

const router = express.Router()
router.get('/', asyncHandler(getServices))
router.post('/', protect, [body('title').notEmpty(), body('description').notEmpty()], validateRequest, asyncHandler(createService))
router.put('/:id', protect, asyncHandler(updateService))
router.delete('/:id', protect, asyncHandler(deleteService))
export default router

