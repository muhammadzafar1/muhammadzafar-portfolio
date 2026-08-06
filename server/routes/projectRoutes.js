import fs from 'fs'
import path from 'path'
import express from 'express'
import multer from 'multer'
import { getProjects, getProjectById, createProject, updateProject, deleteProject } from '../controllers/projectController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()
const projectsUploadPath = path.join(process.cwd(), 'uploads', 'projects')
if (!fs.existsSync(projectsUploadPath)) {
  fs.mkdirSync(projectsUploadPath, { recursive: true })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, projectsUploadPath),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`)
})

const upload = multer({ storage })

router.get('/', getProjects)
router.get('/:id', getProjectById)
router.post('/', protect, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 8 }]), createProject)
router.put('/:id', protect, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 8 }]), updateProject)
router.delete('/:id', protect, deleteProject)

export default router
