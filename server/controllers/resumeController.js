import Resume from '../models/Resume.js'
import path from 'path'
import fs from 'fs'

function getCurrentResume() {
  return Resume.findOne().sort({ uploadedAt: -1 })
}

function resolveFileSystemPath(fileUrl) {
  if (!fileUrl) return null

  const pathname = fileUrl.startsWith('http') ? new URL(fileUrl).pathname : fileUrl
  const cleanPath = pathname.replace(/^\/+/, '')

  if (!cleanPath) return null

  if (process.env.UPLOADS_DIR) {
    const configuredRoot = path.resolve(process.env.UPLOADS_DIR)
    if (cleanPath.startsWith('uploads/')) {
      return path.join(configuredRoot, cleanPath.replace(/^uploads[\\/]+/, ''))
    }
    return path.join(configuredRoot, cleanPath)
  }

  return path.join(process.cwd(), cleanPath)
}

function buildResumeFileUrl() {
  return '/api/resume/download'
}

function buildStoredResumePath(filename) {
  return `/uploads/resume/${filename}`
}

function getStoredResumePath(resume) {
  if (!resume) return null

  if (resume.storagePath) {
    const storedPath = resolveFileSystemPath(resume.storagePath)
    if (storedPath && fs.existsSync(storedPath)) return storedPath
  }

  if (resume.fileUrl && resume.fileUrl.startsWith('/uploads/')) {
    const storedPath = resolveFileSystemPath(resume.fileUrl)
    if (storedPath && fs.existsSync(storedPath)) return storedPath
  }

  if (resume.fileUrl && !resume.fileUrl.startsWith('/api/')) {
    const storedPath = resolveFileSystemPath(resume.fileUrl)
    if (storedPath && fs.existsSync(storedPath)) return storedPath
  }

  return null
}

function serializeResume(resume) {
  if (!resume) return null

  const plainResume = resume.toObject ? resume.toObject() : { ...resume }
  return {
    ...plainResume,
    fileUrl: buildResumeFileUrl()
  }
}

export async function getResume(req, res) {
  try {
    const resume = await getCurrentResume()
    if (!resume) {
      return res.status(404).json({ message: 'Resume not available' })
    }

    const storedPath = getStoredResumePath(resume)
    if (!storedPath) {
      console.warn('Resume metadata exists but file is missing on disk.', {
        fileName: resume.fileName,
        storagePath: resume.storagePath,
        fileUrl: resume.fileUrl
      })

      return res.status(404).json({ message: 'Resume file not found' })
    }

    if (req.path === '/download' || req.originalUrl.endsWith('/download')) {
      return res.download(storedPath, resume.fileName || 'resume.pdf')
    }

    res.json(serializeResume(resume))
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching resume' })
  }
}

export async function uploadResume(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' })
    }

    const currentResume = await getCurrentResume()
    if (currentResume) {
      const previousPath = getStoredResumePath(currentResume)
      if (previousPath && fs.existsSync(previousPath)) {
        try {
          fs.unlinkSync(previousPath)
        } catch (err) {
          console.error('Failed deleting old resume', err.message)
        }
      }
      await currentResume.deleteOne()
    }

    const fileUrl = buildResumeFileUrl()
    const storagePath = buildStoredResumePath(req.file.filename)
    const resumeData = {
      fileName: req.file.originalname,
      fileUrl,
      storagePath,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
      uploadedAt: new Date()
    }

    const newResume = await Resume.create(resumeData)
    res.status(201).json(serializeResume(newResume))
  } catch (error) {
    res.status(500).json({ message: 'Server error uploading resume' })
  }
}

export async function replaceResume(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' })
    }

    const currentResume = await getCurrentResume()
    if (currentResume) {
      const previousPath = getStoredResumePath(currentResume)
      if (previousPath && fs.existsSync(previousPath)) {
        try {
          fs.unlinkSync(previousPath)
        } catch (err) {
          console.error('Failed deleting old resume', err.message)
        }
      }
    }

    const fileUrl = buildResumeFileUrl()
    const storagePath = buildStoredResumePath(req.file.filename)
    const resumeData = {
      fileName: req.file.originalname,
      fileUrl,
      storagePath,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
      uploadedAt: new Date()
    }

    const updatedResume = await Resume.findOneAndUpdate({}, resumeData, { new: true, upsert: true, setDefaultsOnInsert: true })
    res.status(200).json(serializeResume(updatedResume))
  } catch (error) {
    res.status(500).json({ message: 'Server error replacing resume' })
  }
}

export async function deleteResume(req, res) {
  try {
    const currentResume = await getCurrentResume()
    if (!currentResume) {
      return res.status(404).json({ message: 'Resume not available' })
    }

    const resumePath = getStoredResumePath(currentResume)
    if (resumePath && fs.existsSync(resumePath)) {
      try {
        fs.unlinkSync(resumePath)
      } catch (err) {
        console.error('Failed deleting resume', err.message)
      }
    }

    await currentResume.deleteOne()
    res.json({ message: 'Resume deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting resume' })
  }
}
