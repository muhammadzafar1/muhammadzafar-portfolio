import axios from 'axios'

const rawBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
const normalized = rawBase.replace(/\/+$/g, '')
const API_BASE_URL = normalized.endsWith('/api') ? normalized : `${normalized}/api`

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

export const getApiOrigin = () => {
  const rawBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
  const normalized = rawBase.replace(/\/+$/g, '')
  return normalized.endsWith('/api') ? normalized.replace(/\/api$/i, '') : normalized
}

export const getResumeDownloadUrl = (resumeFileUrl) => {
  if (!resumeFileUrl) return null

  if (/^https?:\/\//i.test(resumeFileUrl)) {
    return resumeFileUrl
  }

  const origin = getApiOrigin()
  const relativeUrl = resumeFileUrl.startsWith('/') ? resumeFileUrl : `/${resumeFileUrl}`
  return `${origin}${relativeUrl}`
}

const isMobileBrowser = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

export const fetchHero = () => api.get('/hero')
export const fetchProjects = () => api.get('/projects')
export const fetchSkills = () => api.get('/skills')
export const fetchResume = () => api.get('/resume')
export const downloadResume = async (resumeFileUrl, fileName = 'resume.pdf') => {
  const directUrl = getResumeDownloadUrl(resumeFileUrl)

  if (!directUrl) {
    return api.get('/resume/download', { responseType: 'blob' })
  }

  if (isMobileBrowser()) {
    const newTab = window.open(directUrl, '_blank', 'noopener,noreferrer')
    if (newTab) {
      return { ok: true, url: directUrl, openedInNewTab: true }
    }
  }

  try {
    const response = await fetch(directUrl, { credentials: 'include' })

    if (!response.ok) {
      throw new Error(`Resume download failed with status ${response.status}`)
    }

    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = fileName
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000)

    return { ok: true, url: directUrl }
  } catch (error) {
    const link = document.createElement('a')
    link.href = directUrl
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    link.remove()

    return { ok: true, url: directUrl, fallback: true }
  }
}
export const uploadResume = (payload, config) => api.post('/resume/upload', payload, config)
export const replaceResume = (payload, config) => api.put('/resume/replace', payload, config)
export const deleteResume = (token) => api.delete('/resume/delete', { headers: { Authorization: `Bearer ${token}` } })
export const submitContact = (payload) => api.post('/contact', payload)
export const adminLogin = (payload) => api.post('/auth/login', payload)
export const createProject = (payload, config) => api.post('/projects', payload, config)
export const updateProject = (id, payload, config) => api.put(`/projects/${id}`, payload, config)
export const deleteProject = (id, token) => api.delete(`/projects/${id}`, { headers: { Authorization: `Bearer ${token}` } })
export const fetchMessages = (token) => api.get('/messages', { headers: { Authorization: `Bearer ${token}` } })
export const deleteMessage = (id, token) => api.delete(`/messages/${id}`, { headers: { Authorization: `Bearer ${token}` } })
export const markMessageRead = (id, token) => api.put(`/messages/${id}/read`, null, { headers: { Authorization: `Bearer ${token}` } })
export const createSkill = (payload, token) => api.post('/skills', payload, { headers: { Authorization: `Bearer ${token}` } })
export const deleteSkill = (id, token) => api.delete(`/skills/${id}`, { headers: { Authorization: `Bearer ${token}` } })

export default api
