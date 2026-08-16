import express from 'express'
import multer from 'multer'
import { getProjects, getProjectById, createProject, updateProject, deleteProject } from '../controllers/projectController.js'
import { protect } from '../middlewares/authMiddleware.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import fs from 'fs'
import path from 'path'

const router = express.Router()

// Disk storage for project uploads
const projectsUploadPath = path.join(process.cwd(), 'uploads', 'projects')
if (!fs.existsSync(projectsUploadPath)) {
  fs.mkdirSync(projectsUploadPath, { recursive: true })
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, projectsUploadPath),
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname).toLowerCase()
		const base = path.basename(file.originalname, ext)
		const safeBase = base.replace(/[^a-z0-9-]/gi, '-')
		const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${safeBase}${ext}`
		cb(null, name)
	}
})

const imageFileFilter = (req, file, cb) => {
	const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
	if (allowed.includes(file.mimetype)) return cb(null, true)
	cb(new Error('Invalid file type. Only images are allowed.'), false)
}

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: imageFileFilter })

router.get('/', asyncHandler(getProjects))
router.get('/:id', asyncHandler(getProjectById))
router.post('/', protect, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 8 }]), asyncHandler(createProject))
router.put('/:id', protect, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 8 }]), asyncHandler(updateProject))
router.delete('/:id', protect, asyncHandler(deleteProject))

export default router

