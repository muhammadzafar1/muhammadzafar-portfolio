import express from 'express'
import multer from 'multer'
import { getResume, uploadResume, replaceResume, deleteResume } from '../controllers/resumeController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import fs from 'fs'
import path from 'path'

const router = express.Router()

const uploadsRoot = process.env.UPLOADS_DIR ? path.resolve(process.env.UPLOADS_DIR) : path.join(process.cwd(), 'uploads')
const resumeUploadPath = path.join(uploadsRoot, 'resume')
if (!fs.existsSync(resumeUploadPath)) fs.mkdirSync(resumeUploadPath, { recursive: true })

if (!process.env.UPLOADS_DIR) {
  console.warn('Resume uploads are using the local filesystem. On live hosts with ephemeral storage, the resume can disappear after deploy/restart.')
}

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

