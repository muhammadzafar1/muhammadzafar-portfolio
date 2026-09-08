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
  return path.join(process.cwd(), cleanPath)
}

function buildResumeFileUrl(filename) {
  return `/uploads/resume/${filename}`
}

export async function getResume(req, res) {
  try {
    const resume = await getCurrentResume()
    if (!resume) {
      return res.status(404).json({ message: 'Resume not available' })
    }

    if (req.path === '/download' || req.originalUrl.endsWith('/download')) {
      const downloadUrl = resume.fileUrl
      if (!downloadUrl) {
        return res.status(404).json({ message: 'Resume not available' })
      }

      const safePath = resolveFileSystemPath(downloadUrl)
      if (!safePath || !fs.existsSync(safePath)) {
        return res.status(404).json({ message: 'Resume file not found' })
      }

      return res.download(safePath, resume.fileName || 'resume.pdf')
    }

    res.json(resume)
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
      const previousPath = resolveFileSystemPath(currentResume.fileUrl)
      if (previousPath && fs.existsSync(previousPath)) {
        try {
          fs.unlinkSync(previousPath)
        } catch (err) {
          console.error('Failed deleting old resume', err.message)
        }
      }
      await currentResume.deleteOne()
    }

    const fileUrl = buildResumeFileUrl(req.file.filename)
    const resumeData = {
      fileName: req.file.originalname,
      fileUrl,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
      uploadedAt: new Date()
    }

    const newResume = await Resume.create(resumeData)
    res.status(201).json(newResume)
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
      const previousPath = resolveFileSystemPath(currentResume.fileUrl)
      if (previousPath && fs.existsSync(previousPath)) {
        try {
          fs.unlinkSync(previousPath)
        } catch (err) {
          console.error('Failed deleting old resume', err.message)
        }
      }
    }

    const fileUrl = buildResumeFileUrl(req.file.filename)
    const resumeData = {
      fileName: req.file.originalname,
      fileUrl,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
      uploadedAt: new Date()
    }

    const updatedResume = await Resume.findOneAndUpdate({}, resumeData, { new: true, upsert: true, setDefaultsOnInsert: true })
    res.status(200).json(updatedResume)
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

    const resumePath = resolveFileSystemPath(currentResume.fileUrl)
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
