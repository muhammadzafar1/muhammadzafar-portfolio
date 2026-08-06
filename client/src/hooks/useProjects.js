import { useEffect, useState } from 'react'
import { fetchProjects } from '../services/api'

export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProjects()
      .then((response) => {
        setProjects(response.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message)
        setLoading(false)
      })
  }, [])

  return { projects, loading, error }
}
