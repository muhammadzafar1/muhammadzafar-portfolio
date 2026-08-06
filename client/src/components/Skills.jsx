import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchSkills } from '../services/api.js'

const fallbackSkills = [
  { label: 'HTML', category: 'Frontend', progress: 95, icon: 'https://img.icons8.com/color/48/html-5.png' },
  { label: 'CSS', category: 'Frontend', progress: 90, icon: 'https://img.icons8.com/color/48/css3.png' },
  { label: 'JavaScript', category: 'Frontend', progress: 92, icon: 'https://img.icons8.com/color/48/javascript.png' },
  { label: 'React', category: 'Frontend', progress: 90, icon: 'https://img.icons8.com/color/48/react-native.png' },
  { label: 'Node.js', category: 'Backend', progress: 90, icon: 'https://img.icons8.com/color/48/nodejs.png' },
  { label: 'Express.js', category: 'Backend', progress: 86, icon: 'https://img.icons8.com/fluency/48/express-js.png' },
  { label: 'MongoDB', category: 'Database', progress: 88, icon: 'https://img.icons8.com/color/48/mongodb.png' },
  { label: 'Tailwind CSS', category: 'Design', progress: 88, icon: 'https://img.icons8.com/color/48/tailwind_css.png' }
]

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
}

export default function Skills() {
  const [skills, setSkills] = useState(fallbackSkills)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    fetchSkills()
      .then((response) => {
        if (!active) return
        const data = Array.isArray(response.data) ? response.data : []
        if (data.length) {
          setSkills(data)
        }
      })
      .catch(() => {
        // keep fallback skills if the API is unavailable
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <section id="skills" className="w-full scroll-mt-24 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-4xl font-bold uppercase tracking-wider text-primary sm:text-5xl">Skills</p>
          <h2 className="mt-4 text-lg font-semibold text-slate-600">Capabilities built for modern product teams</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            A premium stack for polished web experiences, scalable APIs, and fast deployment workflows.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {skills.map((skill, index) => (
            <motion.article
              key={`${skill.label}-${index}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.05, ease: 'easeInOut' }}
              variants={cardVariant}
              className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white/90 p-5 shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/90"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-slate-900 ring-1 ring-slate-200">
                    {skill.icon ? (
                      <img src={skill.icon} alt={skill.label} className="h-8 w-8 object-contain" />
                    ) : (
                      <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">{skill.label.slice(0, 2)}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-slate-900">{skill.label}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-500">{skill.category || 'Technology'}</p>
                  </div>
                </div>
                <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                  {skill.progress}%
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-3 text-xs uppercase tracking-[0.24em] text-slate-500">
                  Proficiency
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
