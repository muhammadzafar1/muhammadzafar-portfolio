import axios from 'axios'

const rawBase = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || window.location.origin).replace(/\/+$/g, '')
const API_BASE_URL = rawBase.endsWith('/api') ? rawBase : `${rawBase}/api`

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
})

export const getApiOrigin = () => {
  const rawBase = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || window.location.origin).replace(/\/+$/g, '')
  return rawBase.endsWith('/api') ? rawBase.replace(/\/api$/i, '') : rawBase
}

export const fetchHero = () => api.get('/hero')
export const fetchProjects = () => api.get('/projects')
export const fetchSkills = () => api.get('/skills')
export const submitContact = (payload) => api.post('/contact', payload)
export const adminLogin = (payload, config = {}) => api.post('/auth/login', payload, config)
export const createProject = (payload, config) => api.post('/projects', payload, config)
export const updateProject = (id, payload, config) => api.put(`/projects/${id}`, payload, config)
export const deleteProject = (id, token) => api.delete(`/projects/${id}`, { headers: { Authorization: `Bearer ${token}` } })
export const fetchMessages = (token) => api.get('/messages', { headers: { Authorization: `Bearer ${token}` } })
export const deleteMessage = (id, token) => api.delete(`/messages/${id}`, { headers: { Authorization: `Bearer ${token}` } })
export const markMessageRead = (id, token) => api.put(`/messages/${id}/read`, null, { headers: { Authorization: `Bearer ${token}` } })
export const createSkill = (payload, token) => api.post('/skills', payload, { headers: { Authorization: `Bearer ${token}` } })
export const deleteSkill = (id, token) => api.delete(`/skills/${id}`, { headers: { Authorization: `Bearer ${token}` } })

export default api
