import express from 'express'
import multer from 'multer'
import { uploadMedia, replaceMedia, deleteMedia, getMedia } from '../controllers/mediaController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()
const upload = multer({ dest: 'uploads/' })
router.get('/', protect, getMedia)
router.post('/', protect, upload.single('file'), uploadMedia)
router.put('/:id', protect, upload.single('file'), replaceMedia)
router.delete('/:id', protect, deleteMedia)
export default router
