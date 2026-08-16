import Project from '../models/Project.js'
import fs from 'fs'
import path from 'path'

const parseTechnologies = (input) => {
  if (!input) return []
  if (Array.isArray(input)) return input.filter(Boolean)
  try {
    const parsed = JSON.parse(input)
    if (Array.isArray(parsed)) return parsed.filter(Boolean)
  } catch (error) {
    return input.split(',').map((item) => item.trim()).filter(Boolean)
  }
  return []
}

export async function getProjects(req, res) {
  const projects = await Project.find().sort({ featured: -1, createdAt: -1 })
  res.json(projects)
}

export async function getProjectById(req, res) {
  const project = await Project.findById(req.params.id)
  if (!project) {
    return res.status(404).json({ message: 'Project not found' })
  }
  res.json(project)
}

export async function createProject(req, res) {
  const { title, description, technologies, github, liveDemo, githubUrl, liveUrl, category, featured, icon, status } = req.body
  const thumbnail = req.files?.thumbnail?.[0]
  const galleryFiles = req.files?.images || []

  let image = ''
  if (thumbnail && thumbnail.filename) {
    image = `/uploads/projects/${thumbnail.filename}`
  }

  const images = galleryFiles.map((file) => (file && file.filename ? `/uploads/projects/${file.filename}` : '')).filter(Boolean)

  const normalizedGithub = githubUrl || github || ''
  const normalizedLiveUrl = liveUrl || liveDemo || ''

  const project = await Project.create({
    title,
    description,
    image,
    images,
    technologies: parseTechnologies(technologies),
    github: normalizedGithub,
    githubUrl: normalizedGithub,
    liveDemo: normalizedLiveUrl,
    liveUrl: normalizedLiveUrl,
    category,
    icon: icon || 'FaCode',
    status: status || 'New',
    featured: featured === 'true' || featured === true
  })

  res.status(201).json(project)
}

export async function updateProject(req, res) {
  const project = await Project.findById(req.params.id)
  if (!project) {
    return res.status(404).json({ message: 'Project not found' })
  }

  const { title, description, technologies, github, liveDemo, githubUrl, liveUrl, category, featured, icon, status } = req.body
  const thumbnail = req.files?.thumbnail?.[0]
  const galleryFiles = req.files?.images || []

  project.title = title || project.title
  project.description = description || project.description
  project.technologies = technologies ? parseTechnologies(technologies) : project.technologies

  const nextGithubUrl = githubUrl || github || project.githubUrl || project.github || ''
  const nextLiveUrl = liveUrl || liveDemo || project.liveUrl || project.liveDemo || ''

  project.github = nextGithubUrl
  project.githubUrl = nextGithubUrl
  project.liveDemo = nextLiveUrl
  project.liveUrl = nextLiveUrl
  project.category = category || project.category
  project.icon = icon || project.icon || 'FaCode'
  project.status = status || project.status || 'New'
  if (featured !== undefined) {
    project.featured = featured === 'true' || featured === true
  }

  if (thumbnail && thumbnail.filename) {
    const newPath = `/uploads/projects/${thumbnail.filename}`
    const oldPath = project.image
    project.image = newPath
    if (oldPath && oldPath.startsWith('/uploads/projects/')) {
      const oldFile = path.join(process.cwd(), oldPath.replace(/^\//, ''))
      try {
        if (fs.existsSync(oldFile)) fs.unlinkSync(oldFile)
      } catch (err) {
        console.error('Error deleting old thumbnail:', err.message)
      }
    }
  }

  if (galleryFiles.length > 0) {
    project.images = galleryFiles.map((file) => (file && file.filename ? `/uploads/projects/${file.filename}` : '')).filter(Boolean)
  }

  await project.save()
  res.json(project)
}

export async function deleteProject(req, res) {
  const project = await Project.findById(req.params.id)
  if (!project) {
    return res.status(404).json({ message: 'Project not found' })
  }
  // delete local files if present
  try {
    if (project.image && project.image.startsWith('/uploads/projects/')) {
      const filePath = path.join(process.cwd(), project.image.replace(/^\//, ''))
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    }
    if (Array.isArray(project.images)) {
      for (const img of project.images) {
        if (img && img.startsWith('/uploads/projects/')) {
          const filePath = path.join(process.cwd(), img.replace(/^\//, ''))
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
        }
      }
    }
  } catch (err) {
    console.error('Error deleting project files:', err.message)
  }

  await project.deleteOne()
  res.json({ message: 'Project removed' })
}
