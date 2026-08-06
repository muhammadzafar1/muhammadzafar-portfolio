import express from 'express'
import multer from 'multer'
import { getHero, updateHero } from '../controllers/heroController.js'
import { protect } from '../middlewares/authMiddleware.js'

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

router.get('/', getHero)
router.put('/', protect, upload.fields([{ name: 'heroImage', maxCount: 1 }, { name: 'backgroundImage', maxCount: 1 }]), updateHero)

export default router
