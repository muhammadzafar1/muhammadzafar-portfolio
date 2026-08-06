import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
dotenv.config()
import bcrypt from 'bcryptjs'
import connectDb from './config/db.js'
import User from './models/User.js'
import authRoutes from './routes/authRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import skillRoutes from './routes/skillRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'
import experienceRoutes from './routes/experienceRoutes.js'
import educationRoutes from './routes/educationRoutes.js'
import settingsRoutes from './routes/settingsRoutes.js'
import heroRoutes from './routes/heroRoutes.js'
import aboutRoutes from './routes/aboutRoutes.js'
import resumeRoutes from './routes/resumeRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import mediaRoutes from './routes/mediaRoutes.js'
import { errorHandler } from './middlewares/errorHandler.js'


console.log("EMAIL_USER", process.env.EMAIL_USER);
console.log("EMAIL_PASS", process.env.EMAIL_PASS ? "Loaded" : "Not Loaded");
console.log("EMAIL_PASS Length:", process.env.EMAIL_PASS?.length);
const app = express()

const ensureAdminExists = async () => {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    console.warn('ADMIN_EMAIL or ADMIN_PASSWORD is not set. Skipping default admin creation.')
    return
  }

  const normalizedEmail = process.env.ADMIN_EMAIL.trim().toLowerCase()
  const existingAdmin = await User.findOne({ email: normalizedEmail })
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12)
    await User.create({
      name: 'Admin',
      email: normalizedEmail,
      password: hashedPassword,
      role: 'admin'
    })
    console.log('Default admin user created')
    return
  }

  const passwordMatches = await bcrypt.compare(process.env.ADMIN_PASSWORD, existingAdmin.password)
  if (!passwordMatches) {
    existingAdmin.password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12)
    await existingAdmin.save()
    console.log('Default admin password updated to match .env')
  }
}

app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use('/uploads', express.static('uploads'))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false
})

app.use(limiter)

app.use('/api/auth', authRoutes)
app.use('/api/hero', heroRoutes)
app.use('/api/about', aboutRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/experience', experienceRoutes)
app.use('/api/education', educationRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/resume', resumeRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/media', mediaRoutes)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.use((req, res) => {
  res.status(404).json({ message: 'API endpoint not found' })
})

app.use(errorHandler)

const PORT = process.env.PORT || 5000

const startServer = async () => {
  console.log('Starting server routine...')
  await connectDb()
  console.log('MongoDB connection established')
  await ensureAdminExists()
  console.log('Default Admin ready')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

startServer()

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error)
  process.exit(1)
})
