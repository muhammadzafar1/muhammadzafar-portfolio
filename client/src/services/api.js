import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
})

export const fetchHero = () => api.get('/hero')
export const fetchProjects = () => api.get('/projects')
export const fetchSkills = () => api.get('/skills')
export const fetchResume = () => api.get('/resume')
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

export default api
