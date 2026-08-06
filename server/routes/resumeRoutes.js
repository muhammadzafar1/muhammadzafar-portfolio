import express from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { getResume, uploadResume, replaceResume, deleteResume } from '../controllers/resumeController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'uploads', 'resume')
    fs.mkdirSync(uploadPath, { recursive: true })
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
    cb(null, fileName)
  }
})

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase()
  if (ext !== '.pdf') {
    return cb(new Error('Invalid file type. Only PDF files are allowed.'), false)
  }
  cb(null, true)
}

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter
})

router.get('/', getResume)
router.post('/upload', protect, upload.single('resume'), uploadResume)
router.put('/replace', protect, upload.single('resume'), replaceResume)
router.delete('/delete', protect, deleteResume)
export default router
