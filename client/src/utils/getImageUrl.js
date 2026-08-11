const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/api\/?$/i, '') || ''

export default function getImageUrl(image) {
  if (!image) return ''
  if (typeof image !== 'string') return ''
  const trimmed = image.trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  // If the image already starts with /uploads or uploads, prefix with API base
  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  if (API_BASE) return `${API_BASE}${path}`
  // fallback to using current origin
  if (typeof window !== 'undefined') return `${window.location.origin}${path}`
  return path
}
