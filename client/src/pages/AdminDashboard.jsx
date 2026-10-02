import { useContext, useEffect, useMemo, useState } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'
import { fetchProjects, createProject, updateProject, deleteProject, fetchMessages, deleteMessage, markMessageRead } from '../services/api'
import SkillManager from '../components/SkillManager.jsx'

const iconOptions = [
  'FaShoppingCart',
  'FaChartBar',
  'FaTasks',
  'FaHome',
  'FaBlog',
  'FaUser',
  'FaCode',
  'FaDatabase',
  'FaServer',
  'FaComments',
  'FaBriefcase',
  'FaLaptopCode'
]

const projectCategoryOptions = ['Frontend', 'Backend', 'Full Stack', 'React', 'Node.js', 'Other']

const emptyProjectForm = {
  title: '',
  description: '',
  category: 'Frontend',
  technologies: '',
  githubUrl: '',
  liveUrl: '',
  icon: 'FaCode',
  status: 'New',
  featured: false
}

export default function AdminDashboard() {
  const { token, setToken } = useContext(AdminContext)
  const [projects, setProjects] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [formState, setFormState] = useState(emptyProjectForm)
  const [editProjectId, setEditProjectId] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectsResponse, messagesResponse] = await Promise.all([
          fetchProjects(),
          fetchMessages(token)
        ])
        setProjects(projectsResponse.data)
        setMessages(messagesResponse.data)
      } catch (err) {
        setError(err.response?.data?.message || err.message)
      }

      setLoading(false)
    }
    loadData()
  }, [token])

  const categories = useMemo(() => {
    return [...new Set(projects.map((project) => project.category))]
  }, [projects])

  const handleLogout = () => setToken(null)

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target
    if (type === 'checkbox') {
      setFormState((prev) => ({ ...prev, [name]: checked }))
      return
    }
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormState(emptyProjectForm)
    setEditProjectId(null)
    setError(null)
  }

  const handleEdit = (project) => {
    setEditProjectId(project._id)
    setFormState({
      title: project.title || '',
      description: project.description || '',
      category: project.category || 'Other',
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
      githubUrl: project.githubUrl || project.github || '',
      liveUrl: project.liveUrl || project.liveDemo || '',
      icon: project.icon || 'FaCode',
      status: project.status || 'New',
      featured: Boolean(project.featured)
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    try {
      await deleteProject(id, token)
      setProjects((prev) => prev.filter((project) => project._id !== id))
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
  }

  const handleDeleteMessage = async (id) => {
    if (!confirm('Delete this message?')) return
    try {
      await deleteMessage(id, token)
      setMessages((prev) => prev.filter((message) => message._id !== id))
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
  }

  const handleMarkMessageRead = async (id) => {
    try {
      const response = await markMessageRead(id, token)
      setMessages((prev) => prev.map((message) => (message._id === id ? { ...message, read: true } : message)))
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('title', formState.title)
      formData.append('description', formState.description)
      formData.append('category', formState.category)
      formData.append('technologies', formState.technologies)
      formData.append('github', formState.githubUrl)
      formData.append('githubUrl', formState.githubUrl)
      formData.append('liveDemo', formState.liveUrl)
      formData.append('liveUrl', formState.liveUrl)
      formData.append('icon', formState.icon)
      formData.append('status', formState.status)
      formData.append('featured', String(formState.featured))

      let response
      if (editProjectId) {
        response = await updateProject(editProjectId, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setProjects((prev) => prev.map((project) => (project._id === editProjectId ? response.data : project)))
      } else {
        response = await createProject(formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setProjects((prev) => [response.data, ...prev])
      }
      resetForm()
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Admin Dashboard</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Manage portfolio projects and messages</h1>
            </div>
            <button onClick={handleLogout} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50">
              Sign out
            </button>
          </div>
        </div>

        <section className="space-y-6">
          <SkillManager />

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Project Management</h2>
                <p className="mt-2 text-sm text-slate-600">Add or update projects that appear on the website.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">{projects.length} projects</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
            <div className="grid gap-6 xl:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Project Title
                <input name="title" value={formState.title} onChange={handleFormChange} required className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Category
                <select name="category" value={formState.category} onChange={handleFormChange} required className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                  {projectCategoryOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Short Description
              <textarea name="description" rows="4" value={formState.description} onChange={handleFormChange} required className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
            </label>

            <div className="grid gap-6 xl:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Technologies (comma separated)
                <input name="technologies" value={formState.technologies} onChange={handleFormChange} required className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Project Icon
                <select name="icon" value={formState.icon} onChange={handleFormChange} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                  {iconOptions.map((iconName) => (
                    <option key={iconName} value={iconName}>{iconName}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                GitHub URL
                <input name="githubUrl" value={formState.githubUrl} onChange={handleFormChange} required className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Status
                <select name="status" value={formState.status} onChange={handleFormChange} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </label>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-slate-700">
                Live Demo URL
                <input name="liveUrl" value={formState.liveUrl} onChange={handleFormChange} required className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
              </label>
              <label className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4">
                <span className="text-sm font-medium text-slate-700">Featured project</span>
                <div className="flex items-center gap-3">
                  <input name="featured" type="checkbox" checked={formState.featured} onChange={handleFormChange} className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary" />
                  <span className="text-sm text-slate-600">Highlight this project</span>
                </div>
              </label>
            </div>

            {error && <div className="rounded-3xl bg-red-50 px-5 py-4 text-sm text-red-700">{error}</div>}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" disabled={isSaving} className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-soft disabled:cursor-not-allowed disabled:opacity-60">
                {isSaving ? 'Saving project...' : editProjectId ? 'Update Project' : 'Add Project'}
              </button>
              <button type="button" onClick={resetForm} className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50">
                Reset Form
              </button>
            </div>
          </form>

          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-4 shadow-soft">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-4 font-semibold text-slate-700">Icon</th>
                    <th className="px-4 py-4 font-semibold text-slate-700">Title</th>
                    <th className="px-4 py-4 font-semibold text-slate-700">Category</th>
                    <th className="px-4 py-4 font-semibold text-slate-700">Technologies</th>
                    <th className="px-4 py-4 font-semibold text-slate-700">Status</th>
                    <th className="px-4 py-4 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {projects.map((project) => (
                    <tr key={project._id}>
                      <td className="px-4 py-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-[#2563EB] text-lg">
                          {project.icon || 'FaCode'}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-semibold text-slate-900">{project.title}</div>
                      </td>
                      <td className="px-4 py-4 text-slate-600">{project.category}</td>
                      <td className="px-4 py-4 text-slate-600">
                        {Array.isArray(project.technologies) ? project.technologies.join(', ') : ''}
                      </td>
                      <td className="px-4 py-4 text-slate-600">{project.featured ? 'Featured' : project.status || 'New'}</td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          <button onClick={() => handleEdit(project)} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-primary hover:text-primary">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(project._id)} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-secondary">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
            <h2 className="text-xl font-semibold text-slate-900">Messages</h2>
            <p className="mt-3 text-sm text-slate-600">Incoming contact requests from the website.</p>
          </div>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message._id} className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{message.name}</p>
                    <p className="text-sm text-slate-500">{message.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{new Date(message.createdAt).toLocaleDateString()}</p>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${message.read ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-100 text-sky-700'}`}>
                      {message.read ? 'Read' : 'Unread'}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-slate-600">{message.subject}</p>
                <p className="mt-3 text-slate-500">{message.message}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {!message.read && (
                    <button onClick={() => handleMarkMessageRead(message._id)} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                      Mark as Read
                    </button>
                  )}
                  <button onClick={() => handleDeleteMessage(message._id)} className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
