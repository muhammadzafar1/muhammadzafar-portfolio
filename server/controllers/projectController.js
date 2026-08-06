import Project from '../models/Project.js'

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
  const { title, description, technologies, github, liveDemo, category, featured } = req.body
  const thumbnail = req.files?.thumbnail?.[0]
  const galleryFiles = req.files?.images || []

  const image = thumbnail ? `${req.protocol}://${req.get('host')}/uploads/projects/${thumbnail.filename}` : ''
  const images = galleryFiles.map((file) => `${req.protocol}://${req.get('host')}/uploads/projects/${file.filename}`)

  const project = await Project.create({
    title,
    description,
    image,
    images,
    technologies: parseTechnologies(technologies),
    github,
    liveDemo,
    category,
    featured: featured === 'true' || featured === true
  })

  res.status(201).json(project)
}

export async function updateProject(req, res) {
  const project = await Project.findById(req.params.id)
  if (!project) {
    return res.status(404).json({ message: 'Project not found' })
  }

  const { title, description, technologies, github, liveDemo, category, featured } = req.body
  const thumbnail = req.files?.thumbnail?.[0]
  const galleryFiles = req.files?.images || []

  project.title = title || project.title
  project.description = description || project.description
  project.technologies = technologies ? parseTechnologies(technologies) : project.technologies
  project.github = github || project.github
  project.liveDemo = liveDemo || project.liveDemo
  project.category = category || project.category
  if (featured !== undefined) {
    project.featured = featured === 'true' || featured === true
  }

  if (thumbnail) {
    project.image = `${req.protocol}://${req.get('host')}/uploads/projects/${thumbnail.filename}`
  }

  if (galleryFiles.length > 0) {
    project.images = galleryFiles.map((file) => `${req.protocol}://${req.get('host')}/uploads/projects/${file.filename}`)
  }

  await project.save()
  res.json(project)
}

export async function deleteProject(req, res) {
  const project = await Project.findById(req.params.id)
  if (!project) {
    return res.status(404).json({ message: 'Project not found' })
  }
  await project.deleteOne()
  res.json({ message: 'Project removed' })
}
