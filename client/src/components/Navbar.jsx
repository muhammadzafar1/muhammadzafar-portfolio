import { useEffect, useState } from 'react'
import { FiMenu, FiX, FiDownload } from 'react-icons/fi'
import { downloadResume, fetchResume } from '../services/api.js'
import heroImage from '../assets/images/logo.png'

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [resume, setResume] = useState(null)

  useEffect(() => {
    fetchResume()
      .then((response) => setResume(response.data))
      .catch(() => setResume(null))
  }, [])

  const handleDownloadResume = async () => {
    if (!resume?.fileUrl) return

    try {
      await downloadResume(resume.fileUrl, resume.fileName)
    } catch (error) {
      console.error('Resume download failed:', error)
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-20 border-b border-slate-200/80 bg-white">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6">
        <a href="#home" className="flex items-center gap-3 text-lg font-semibold text-slate-900">
          <img
            src={heroImage}
            alt="Muhammad Zafar Logo"
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl object-cover shadow-soft"
          />
          <span>Muhammad Zafar</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="rounded-2xl px-3 py-2 text-sm font-medium text-slate-700 transition duration-200 hover:bg-sky-500 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <a href="/admin/login" className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-primary/90">
            Admin
          </a>
          {resume?.fileUrl ? (
            <button
              type="button"
              onClick={handleDownloadResume}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-primary/90"
            >
              <FiDownload /> Download CV
            </button>
          ) : (
            <button
              disabled
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-400 shadow-sm"
            >
              <FiDownload /> No Resume Available
            </button>
          )}
        </nav>

        <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-soft lg:hidden" onClick={() => setOpen((state) => !state)}>
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

        {open && (
        <>
          {/* Overlay (transparent - captures clicks, does not blur) */}
          <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setOpen(false)} />
          {/* Mobile Menu */}
          <div className="fixed right-0 top-0 z-50 h-full w-72 border-l border-slate-200 bg-white p-6 shadow-xl lg:hidden">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition duration-200 hover:bg-sky-500 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a href="/admin/login" className="rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary/90">
                Admin
              </a>
              {resume?.fileUrl ? (
                <button
                  type="button"
                  onClick={handleDownloadResume}
                  className="inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white"
                >
                  <FiDownload /> Download CV
                </button>
              ) : (
                <button disabled className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-400">
                  <FiDownload /> No Resume Available
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  )
}
