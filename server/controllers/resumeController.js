import Resume from '../models/Resume.js'
import fs from 'fs'
import path from 'path'

function getCurrentResume() {
  return Resume.findOne().sort({ uploadedAt: -1 })
}

function deleteResumeFile(fileUrl) {
  if (!fileUrl) return
  try {
    const filename = fileUrl.split('/uploads/resume/').pop()
    if (!filename) return
    const filePath = path.join(process.cwd(), 'uploads', 'resume', filename)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  } catch (error) {
    console.error('Error deleting resume file:', error.message)
  }
}

export async function getResume(req, res) {
  try {
    const resume = await getCurrentResume()
    if (!resume) {
      return res.status(404).json({ message: 'Resume not available' })
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
      deleteResumeFile(currentResume.fileUrl)
      await currentResume.deleteOne()
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/resume/${req.file.filename}`
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
      deleteResumeFile(currentResume.fileUrl)
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/resume/${req.file.filename}`
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

    deleteResumeFile(currentResume.fileUrl)
    await currentResume.deleteOne()
    res.json({ message: 'Resume deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting resume' })
  }
}
