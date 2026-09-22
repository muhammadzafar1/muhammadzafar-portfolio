import Resume from '../models/Resume.js'
import path from 'path'
import fs from 'fs'
import { execSync } from 'child_process'

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
    fileUrl: plainResume.fileUrl && plainResume.fileUrl.startsWith('http') ? plainResume.fileUrl : buildResumeFileUrl()
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

      // If the stored file is hosted externally (e.g. raw.githubusercontent.com),
      // redirect the download request to that URL so users can download directly.
      if ((resume.fileUrl || '').startsWith('http') && (req.path === '/download' || req.originalUrl.endsWith('/download'))) {
        return res.redirect(resume.fileUrl)
      }

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

    let fileUrl = buildResumeFileUrl()
    const storagePath = buildStoredResumePath(req.file.filename)

    // Optionally persist the uploaded file into the git repository and push
    // This path uses SSH deploy key (no token). Environment variables:
    // - GIT_PERSIST=true
    // - GIT_SSH_KEY (private key contents)
    // - GIT_RAW_BASE_URL (e.g. https://raw.githubusercontent.com/user/repo/branch)
    // - GIT_STORE_PATH (optional, repo-relative path to store files, default: public/resume)
    // - GIT_BRANCH (optional, default: main)
    if (process.env.GIT_PERSIST === 'true' && process.env.GIT_SSH_KEY && process.env.GIT_RAW_BASE_URL) {
      try {
        const repoRoot = process.cwd()
        const repoStoreRel = process.env.GIT_STORE_PATH || path.join('public', 'resume')
        const repoStoreAbs = path.isAbsolute(repoStoreRel) ? repoStoreRel : path.join(repoRoot, repoStoreRel)
        if (!fs.existsSync(repoStoreAbs)) fs.mkdirSync(repoStoreAbs, { recursive: true })

        const src = getStoredResumePath({ storagePath: storagePath }) || path.join(process.cwd(), storagePath.replace(/^\/+/, ''))
        const destFilename = req.file.filename
        const destAbs = path.join(repoStoreAbs, destFilename)
        fs.copyFileSync(path.join(process.cwd(), 'uploads', 'resume', req.file.filename), destAbs)

        // write SSH key to temp file
        const tmpKeyPath = path.join(repoRoot, '.git_deploy_key')
        fs.writeFileSync(tmpKeyPath, process.env.GIT_SSH_KEY + '\n', { mode: 0o600 })

        const branch = process.env.GIT_BRANCH || 'main'
        const relPathForUrl = path.posix.join(repoStoreRel.split(path.sep).join('/'), destFilename)
        const rawUrl = `${process.env.GIT_RAW_BASE_URL.replace(/\/$/, '')}/${relPathForUrl}`

        const gitEnv = {
          ...process.env,
          GIT_SSH_COMMAND: `ssh -i ${tmpKeyPath} -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null`
        }

        try {
          execSync(`git add -- ${relPathForUrl}`, { cwd: repoRoot, env: gitEnv })
          try {
            execSync(`git commit -m "Add resume ${destFilename} via app" -- ${relPathForUrl}`, { cwd: repoRoot, env: gitEnv })
          } catch (e) {
            // commit may fail if nothing changed; ignore
          }
          execSync(`git push origin ${branch}`, { cwd: repoRoot, env: gitEnv, stdio: 'ignore' })
          fileUrl = rawUrl
        } finally {
          try { fs.unlinkSync(tmpKeyPath) } catch (e) {}
        }
      } catch (err) {
        console.error('Git persistence failed:', err && err.message ? err.message : err)
      }
    }
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

    let fileUrl = buildResumeFileUrl()
    const storagePath = buildStoredResumePath(req.file.filename)

    if (process.env.GIT_PERSIST === 'true' && process.env.GIT_SSH_KEY && process.env.GIT_RAW_BASE_URL) {
      try {
        const repoRoot = process.cwd()
        const repoStoreRel = process.env.GIT_STORE_PATH || path.join('public', 'resume')
        const repoStoreAbs = path.isAbsolute(repoStoreRel) ? repoStoreRel : path.join(repoRoot, repoStoreRel)
        if (!fs.existsSync(repoStoreAbs)) fs.mkdirSync(repoStoreAbs, { recursive: true })

        const destFilename = req.file.filename
        const destAbs = path.join(repoStoreAbs, destFilename)
        fs.copyFileSync(path.join(process.cwd(), 'uploads', 'resume', req.file.filename), destAbs)

        const tmpKeyPath = path.join(repoRoot, '.git_deploy_key')
        fs.writeFileSync(tmpKeyPath, process.env.GIT_SSH_KEY + '\n', { mode: 0o600 })

        const branch = process.env.GIT_BRANCH || 'main'
        const relPathForUrl = path.posix.join(repoStoreRel.split(path.sep).join('/'), destFilename)
        const rawUrl = `${process.env.GIT_RAW_BASE_URL.replace(/\/$/, '')}/${relPathForUrl}`

        const gitEnv = {
          ...process.env,
          GIT_SSH_COMMAND: `ssh -i ${tmpKeyPath} -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null`
        }

        try {
          execSync(`git add -- ${relPathForUrl}`, { cwd: repoRoot, env: gitEnv })
          try {
            execSync(`git commit -m "Replace resume ${destFilename} via app" -- ${relPathForUrl}`, { cwd: repoRoot, env: gitEnv })
          } catch (e) {
            // ignore commit errors
          }
          execSync(`git push origin ${branch}`, { cwd: repoRoot, env: gitEnv, stdio: 'ignore' })
          fileUrl = rawUrl
        } finally {
          try { fs.unlinkSync(tmpKeyPath) } catch (e) {}
        }
      } catch (err) {
        console.error('Git persistence failed:', err && err.message ? err.message : err)
      }
    }

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
