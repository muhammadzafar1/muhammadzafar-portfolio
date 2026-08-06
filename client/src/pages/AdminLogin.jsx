import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext.jsx'
import { adminLogin } from '../services/api'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { setToken } = useContext(AdminContext)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await adminLogin(credentials)
      setToken(response.data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials.')
    } finally {
      setLoading(false)
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
          {error && <p className="rounded-3xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-soft disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
