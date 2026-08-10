import { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'
import { fetchSkills, createSkill, deleteSkill } from '../services/api.js'

const categories = ['Frontend', 'Backend', 'Database', 'Tools']

export default function SkillManager() {
  const { token } = useContext(AdminContext)
  const [skills, setSkills] = useState([])
  const [form, setForm] = useState({ name: '', category: categories[0], icon: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    let active = true

    const loadSkills = async () => {
      try {
        const response = await fetchSkills()
        if (!active) return
        setSkills(Array.isArray(response.data) ? response.data : [])
      } catch (err) {
        if (!active) return
        setError('Unable to load skills. Please refresh.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadSkills()

    return () => {
      active = false
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!form.name.trim()) {
      setError('Skill name is required.')
      return
    }

    setSaving(true)
    try {
      const payload = {
        name: form.name.trim(),
        category: form.category,
        icon: form.icon.trim() || ''
      }
      const response = await createSkill(payload, token)
      setSkills((prev) => [response.data, ...prev])
      setForm({ name: '', category: categories[0], icon: '' })
      setSuccess('Skill added successfully.')
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to add skill.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (skillId) => {
    if (!window.confirm('Delete this skill?')) return
    setError('')
    setSuccess('')

    try {
      await deleteSkill(skillId, token)
      setSkills((prev) => prev.filter((skill) => skill._id !== skillId))
      setSuccess('Skill deleted successfully.')
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to delete skill.')
    }
  }

  if (!token) {
    return null
  }

  return (
    <section className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Skill Management</h2>
          <p className="mt-2 text-sm text-slate-600">Create and remove skills for the public portfolio section.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">{skills.length} skills</span>
      </div>

      <form className="grid gap-4 sm:grid-cols-[1.5fr_1fr_1fr_auto]" onSubmit={handleSubmit}>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Skill Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Type skill name"
            className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Category
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Icon URL
          <input
            name="icon"
            value={form.icon}
            onChange={handleChange}
            placeholder="Optional icon URL"
            className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </label>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Add Skill'}
        </button>
      </form>

      {error && <div className="rounded-3xl bg-red-50 px-5 py-4 text-sm text-red-700">{error}</div>}
      {success && <div className="rounded-3xl bg-emerald-50 px-5 py-4 text-sm text-emerald-700">{success}</div>}

      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50">
        <div className="grid grid-cols-[1.8fr_1fr_1fr_auto] gap-4 border-b border-slate-200 bg-white px-5 py-4 text-xs uppercase tracking-[0.24em] text-slate-500">
          <span>Skill</span>
          <span>Category</span>
          <span>Icon</span>
          <span className="text-right">Actions</span>
        </div>

        {loading ? (
          <div className="p-6 text-sm text-slate-500">Loading skills...</div>
        ) : skills.length === 0 ? (
          <div className="p-6 text-sm text-slate-500">No skills found.</div>
        ) : (
          skills.map((skill) => (
            <div key={skill._id} className="grid grid-cols-[1.8fr_1fr_1fr_auto] gap-4 items-center border-b border-slate-200 px-5 py-4 last:border-b-0">
              <div>
                <p className="font-semibold text-slate-900">{skill.name || skill.label}</p>
              </div>
              <div className="text-sm uppercase tracking-[0.24em] text-slate-600">{skill.category || 'Unknown'}</div>
              <div className="text-sm text-slate-700 break-words">{skill.icon ? <a href={skill.icon} target="_blank" rel="noreferrer" className="text-primary underline">View</a> : '—'}</div>
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => handleDelete(skill._id)}
                  className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
