import axios from 'axios'

const envBase = import.meta.env.VITE_API_BASE_URL || ''
// Prefer a production env variable when present. During Vite dev (`import.meta.env.DEV`),
// force the local backend so local testing (login, admin) hits `http://localhost:5000`.
let API_BASE_URL = envBase || (import.meta.env.DEV ? 'http://localhost:5000/api' : 'https://muhammadzafar-portfolio.onrender.com/api')

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    // Prefer fresh data for public endpoints
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0'
  }
})

// GET helpers include a timestamp query param to avoid stale cached GET responses
export const fetchHero = () => api.get('/hero', { params: { t: Date.now() } })
export const fetchProjects = () => api.get('/projects', { params: { t: Date.now() } })
export const fetchSkills = () => api.get('/skills', { params: { t: Date.now() } })
export const fetchResume = () => api.get('/resume', { params: { t: Date.now() } })
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
