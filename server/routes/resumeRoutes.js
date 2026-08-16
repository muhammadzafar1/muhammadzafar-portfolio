import express from 'express'
import multer from 'multer'
import { getResume, uploadResume, replaceResume, deleteResume } from '../controllers/resumeController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import fs from 'fs'
import path from 'path'

const router = express.Router()

const resumeUploadPath = path.join(process.cwd(), 'uploads', 'resume')
if (!fs.existsSync(resumeUploadPath)) fs.mkdirSync(resumeUploadPath, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, resumeUploadPath),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
    cb(null, name)
  }
})

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } })

router.get('/', asyncHandler(getResume))
router.get('/download', asyncHandler(getResume))
router.post('/upload', protect, upload.single('resume'), asyncHandler(uploadResume))
router.put('/replace', protect, upload.single('resume'), asyncHandler(replaceResume))
router.delete('/delete', protect, asyncHandler(deleteResume))

export default router

