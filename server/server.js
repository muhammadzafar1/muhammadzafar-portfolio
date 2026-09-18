import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
dotenv.config()
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'
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

// ── Required environment variable validation ──────────────────────────────
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET']
const missing = requiredEnvVars.filter((key) => !process.env[key])
if (missing.length > 0) {
  console.error(`FATAL: Missing required environment variables: ${missing.join(', ')}`)
  process.exit(1)
}

// ── Upload directories (create on startup so Multer never fails) ──────────
const uploadsRoot = process.env.UPLOADS_DIR ? path.resolve(process.env.UPLOADS_DIR) : path.join(process.cwd(), 'uploads')
if (!process.env.UPLOADS_DIR) {
  console.warn('UPLOADS_DIR is not set. Resume uploads are stored in the local filesystem and may disappear after a deploy/restart on ephemeral hosts.')
}

const uploadDirs = [uploadsRoot, path.join(uploadsRoot, 'projects'), path.join(uploadsRoot, 'resume')]
for (const dir of uploadDirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

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

// ── Middleware (order matters) ────────────────────────────────────────────
app.use(helmet())

// trust proxy — required on Railway (behind load balancer) so that
// express sees the real client IP (for rate-limiting) and the correct
// protocol (req.protocol → 'https') for uploaded file URLs.
app.set('trust proxy', 1)

// ── CORS ──────────────────────────────────────────────────────────────────
const allowedOrigins = [
  'https://www.muhammadzafar.online',
  'https://muhammadzafar.online',
  'https://muhammadzafar-portfolio.vercel.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:5175'
]

const envOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim()).filter(Boolean)
  : []

const corsOrigins = [...new Set([...envOrigins, ...allowedOrigins])]

app.use(cors({
  origin(origin, callback) {
    if (!origin) {
      // allow non-browser tools like Postman, or same-origin requests without Origin header
      return callback(null, true)
    }

    if (corsOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error(`CORS origin denied: ${origin}`), false)
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}))

app.options('*', cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true)
    return corsOrigins.includes(origin) ? callback(null, true) : callback(new Error(`CORS origin denied: ${origin}`), false)
  },
  credentials: true
}))

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Sanitised morgan — log method, url, status, response-time only
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use('/uploads', express.static(uploadsRoot))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false
})

app.use(limiter)

// ── Routes ───────────────────────────────────────────────────────────────
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
  console.error('Unhandled Rejection:', error.message)
  process.exit(1)
})
