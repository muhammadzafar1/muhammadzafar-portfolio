import { useState } from 'react'
import { motion } from 'framer-motion'
import { submitContact } from '../services/api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState({ message: '', type: '' })

  const showToast = (message, type) => {
    setToast({ message, type })
    window.setTimeout(() => setToast({ message: '', type: '' }), 4200)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setSuccess(null)
    setError(null)

    try {
      const response = await submitContact(form)
      setSuccess(response.data.message || 'Message sent successfully. I will get back to you soon.')
      showToast(response.data.message || 'Message sent successfully.', 'success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Unable to send message. Please try again later.'
      setError(errorMessage)
      showToast(errorMessage, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="bg-surface min-h-screen w-full scroll-mt-20 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 text-center">
          <p className="text-4xl font-bold uppercase tracking-wider text-primary sm:text-5xl">Contact</p>
          <h2 className="mt-4 text-lg font-semibold text-slate-600">Start a conversation</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
            Ready to collaborate on your next project? Send a message and I’ll respond within 24 hours.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="mx-auto grid max-w-3xl gap-6 rounded-[32px] border border-slate-200 bg-white p-10 shadow-soft"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Name
              <input name="name" required value={form.name} onChange={handleChange} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Email
              <input name="email" type="email" required value={form.email} onChange={handleChange} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Subject
            <input name="subject" required value={form.subject} onChange={handleChange} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Message
            <textarea name="message" rows="6" required value={form.message} onChange={handleChange} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </label>

          {success && <div className="rounded-3xl bg-emerald-50 px-5 py-4 text-sm text-emerald-700">{success}</div>}
          {error && <div className="rounded-3xl bg-red-50 px-5 py-4 text-sm text-red-700">{error}</div>}
          {toast.message && (
            <div className={`rounded-3xl px-5 py-4 text-sm ${toast.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
              {toast.message}
            </div>
          )}

          <button type="submit" disabled={loading} className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-soft disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </motion.form>
      </div>
    </section>
  )
}
