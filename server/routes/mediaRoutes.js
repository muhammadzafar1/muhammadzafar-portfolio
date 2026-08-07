import express from 'express'
import multer from 'multer'
import { uploadMedia, replaceMedia, deleteMedia, getMedia } from '../controllers/mediaController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'

const router = express.Router()
const upload = multer({ dest: 'uploads/' })
router.get('/', protect, asyncHandler(getMedia))
router.post('/', protect, upload.single('file'), asyncHandler(uploadMedia))
router.put('/:id', protect, upload.single('file'), asyncHandler(replaceMedia))
router.delete('/:id', protect, asyncHandler(deleteMedia))
export default router

