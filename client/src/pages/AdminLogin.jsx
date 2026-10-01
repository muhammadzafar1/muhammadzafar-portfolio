import { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext.jsx'
import { adminLogin } from '../services/api'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [slowServer, setSlowServer] = useState(false)
  const controllerRef = useRef(null)
  const { setToken } = useContext(AdminContext)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const resetRequestState = () => {
    setLoading(false)
    setSlowServer(false)
    controllerRef.current = null
  }

  const handleSubmit = async (event) => {
    if (event) event.preventDefault()
    if (loading) return

    setLoading(true)
    setError(null)
    setSlowServer(false)

    const controller = new AbortController()
    controllerRef.current = controller

    const wakeTimer = window.setTimeout(() => {
      setSlowServer(true)
    }, 4000)

    try {
      const response = await adminLogin(credentials, {
        signal: controller.signal,
        timeout: 60000
      })
      setToken(response.data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') {
        return
      }
      setError(err.response?.data?.message || 'Invalid credentials.')
    } finally {
      clearTimeout(wakeTimer)
      resetRequestState()
    }
  }

  return (
    <div className="min-h-screen bg-surface py-20">
      <div className="mx-auto max-w-md rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Admin Panel</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">Sign in to manage content</h1>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Email
            <input name="email" type="email" value={credentials.email} onChange={handleChange} required className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Password
            <input name="password" type="password" value={credentials.password} onChange={handleChange} required className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </label>
          {error && (
            <div className="rounded-3xl bg-red-50 px-4 py-3 text-sm text-red-700">
              <p>{error}</p>
              <button type="button" onClick={handleSubmit} className="mt-2 font-semibold underline underline-offset-2">
                Retry
              </button>
            </div>
          )}
          {slowServer && (
            <p className="text-sm text-amber-700">Server is waking up, please wait a few seconds...</p>
          )}
          <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-soft disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
