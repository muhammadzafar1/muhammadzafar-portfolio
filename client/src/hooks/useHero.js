import { useEffect, useState } from 'react'
import { fetchHero } from '../services/api'

export function useHero() {
  const [hero, setHero] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchHero()
      .then((response) => {
        setHero(response.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.response?.data?.message || err.message)
        setLoading(false)
      })
  }, [])

  return { hero, loading, error }
}
