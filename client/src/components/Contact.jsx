import { useState } from 'react'
import { submitContact } from '../services/api'

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (submitted || loading) return

    setLoading(true)
    setError('')

    try {
      const response = await submitContact(form)
      const message = response?.data?.message || 'Message sent ✓'
      setSuccess(message)
      setSubmitted(true)
      setForm(initialForm)
    } catch (err) {
      const message = err?.response?.data?.message || 'Unable to send message. Please try again later.'
      setError(message)
      setSuccess('')
    } finally {
      setLoading(false)
    }
  }

  const messageLength = form.message.length

  return (
    <section id="contact" className="w-full scroll-mt-20 bg-[#f7f4ef] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[22px] border border-[#dfe5e0] bg-white shadow-[0_20px_60px_rgba(18,31,29,0.08)]">
          <div className="grid md:grid-cols-[0.96fr_1.34fr]">
            <aside className="relative overflow-hidden bg-[#102b27] p-8 text-[#eef3f0] sm:p-10 lg:p-12">
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  background:
                    'radial-gradient(circle at top right, rgba(167, 195, 184, 0.18), transparent 38%)',
                }}
              />

              <div className="relative z-10 flex h-full flex-col">
                <p className="mb-5 inline-flex w-fit rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-[0.2em] text-[#d7e2de] uppercase">
                  Get in touch
                </p>

                <h2
                  className="max-w-xs text-[2.2rem] leading-none text-[#f8f7f3] md:text-[2.7rem]"
                  style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                >
                  Let&apos;s build something meaningful.
                </h2>

                <p className="mt-5 max-w-[28rem] text-sm leading-7 text-[#c7d4d0] md:text-[0.98rem]">
                  I design and build thoughtful digital experiences for brands, startups, and teams that want clarity, polish, and momentum.
                </p>

                <div className="mt-10 space-y-4 border-t border-white/10 pt-6">
                  <div className="flex items-start justify-between gap-4 text-sm text-[#edf0ef]">
                    <span className="text-[#adc0b9]">Email</span>
                    <a href="mailto:muhammadzafar3939@gmail.com" className="text-right text-[#f7f9f8] transition hover:text-[#dfeae6]">
                      muhammadzafar3939@gmail.com
                    </a>
                  </div>

                  <div className="flex items-start justify-between gap-4 text-sm text-[#edf0ef]">
                    <span className="text-[#adc0b9]">Location</span>
                    <span className="text-right text-[#f7f9f8]">Lahore, Pakistan</span>
                  </div>

                  <div className="flex items-start justify-between gap-4 text-sm text-[#edf0ef]">
                    <span className="text-[#adc0b9]">Available</span>
                    <span className="text-right text-[#f7f9f8]">For freelance and full-time work</span>
                  </div>
                </div>

                <div className="mt-auto border-t border-white/10 pt-5 text-sm text-[#d5e1de]">
                  Typically replies within 24 hours.
                </div>
              </div>
            </aside>

            <div className="bg-[#fdfcfb] p-6 sm:p-8 lg:p-10">
              <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-medium tracking-[0.18em] text-[#739084] uppercase">Send a note</p>
                  <h3 className="mt-2 text-2xl font-semibold text-[#192b2a]">Tell me about your project</h3>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-[#273734]" htmlFor="name">
                    Name
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      required
                      disabled={submitted}
                      className="mt-2 w-full rounded-[10px] border border-[#d9dfdc] bg-[#f4f5f3] px-3.5 py-3 text-[0.96rem] text-[#1e2a2a] placeholder:text-[#7a8b87] transition duration-200 focus:border-[#22493f] focus:outline-none focus:ring-4 focus:ring-[#dfeae6] disabled:cursor-not-allowed disabled:opacity-70"
                      placeholder="Your name"
                    />
                  </label>

                  <label className="block text-sm font-medium text-[#273734]" htmlFor="email">
                    Email
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      disabled={submitted}
                      className="mt-2 w-full rounded-[10px] border border-[#d9dfdc] bg-[#f4f5f3] px-3.5 py-3 text-[0.96rem] text-[#1e2a2a] placeholder:text-[#7a8b87] transition duration-200 focus:border-[#22493f] focus:outline-none focus:ring-4 focus:ring-[#dfeae6] disabled:cursor-not-allowed disabled:opacity-70"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>

                <label className="block text-sm font-medium text-[#273734]" htmlFor="subject">
                  Subject
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    disabled={submitted}
                    className="mt-2 w-full rounded-[10px] border border-[#d9dfdc] bg-[#f4f5f3] px-3.5 py-3 text-[0.96rem] text-[#1e2a2a] placeholder:text-[#7a8b87] transition duration-200 focus:border-[#22493f] focus:outline-none focus:ring-4 focus:ring-[#dfeae6] disabled:cursor-not-allowed disabled:opacity-70"
                    placeholder="Project inquiry"
                  />
                </label>

                <div>
                  <label className="block text-sm font-medium text-[#273734]" htmlFor="message">
                    Message
                  </label>
                  <div className="relative mt-2">
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      disabled={submitted}
                      maxLength={600}
                      rows={8}
                      className="w-full resize-y rounded-[10px] border border-[#d9dfdc] bg-[#f4f5f3] px-3.5 py-3 text-[0.96rem] text-[#1e2a2a] placeholder:text-[#7a8b87] transition duration-200 focus:border-[#22493f] focus:outline-none focus:ring-4 focus:ring-[#dfeae6] disabled:cursor-not-allowed disabled:opacity-70"
                      placeholder="Tell me a little about your goals, timeline, and scope..."
                      style={{ minHeight: '8rem' }}
                    />
                    <span className="absolute bottom-2 right-3 text-[11px] font-medium text-[#6d7d79]">
                      {messageLength}/600
                    </span>
                  </div>
                </div>

                {success && (
                  <div aria-live="polite" className="rounded-[10px] border border-[#cfe2db] bg-[#edf7f3] px-4 py-3 text-sm font-medium text-[#1b544a]">
                    {success}
                  </div>
                )}

                {error && (
                  <div aria-live="polite" className="rounded-[10px] border border-[#eac7c7] bg-[#fff1f1] px-4 py-3 text-sm font-medium text-[#8a2c2c]">
                    {error}
                  </div>
                )}

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={loading || submitted}
                    className="inline-flex w-full items-center justify-center rounded-[10px] bg-[#111c1b] px-5 py-3.5 text-sm font-semibold text-white transition duration-200 hover:bg-[#19443d] active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#234d44] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? 'Sending...' : submitted ? 'Message sent ✓' : 'Send Message'}
                  </button>

                  <p className="mt-3 text-center text-xs text-[#6e7a76]">
                    Replies come from the same email address — no newsletters.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
