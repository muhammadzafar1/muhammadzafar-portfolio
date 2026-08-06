import express from 'express'
import { body } from 'express-validator'
import { getServices, createService, updateService, deleteService } from '../controllers/serviceController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { validateRequest } from '../middlewares/validators.js'

const router = express.Router()
router.get('/', getServices)
router.post('/', protect, [body('title').notEmpty(), body('description').notEmpty()], validateRequest, createService)
router.put('/:id', protect, updateService)
router.delete('/:id', protect, deleteService)
export default router
