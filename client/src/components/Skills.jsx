import { useEffect, useMemo, useState } from 'react'

import SkillCard from './SkillCard'
import skills from '../data/skills'

export default function Skills() {
  const [activeTag, setActiveTag] = useState('All')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(false)

    if (typeof window === 'undefined') {
      return undefined
    }

    const frameId = window.requestAnimationFrame(() => setReady(true))
    return () => window.cancelAnimationFrame(frameId)
  }, [skills.length])

  const chips = useMemo(() => {
    if (!skills.length) return ['All']
    return ['All', ...new Set(skills.map((skill) => skill.category).filter(Boolean))]
  }, [])

  const filteredSkills = useMemo(() => {
    if (!skills.length) return []
    if (activeTag === 'All') return skills
    return skills.filter((skill) => skill.category === activeTag)
  }, [activeTag])

  return (
    <section id="skills" className={`w-full scroll-mt-24 bg-[#f5f7fb] py-16 sm:py-20 ${ready ? 'is-ready' : ''}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#7c5cff]">Skills</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-900 sm:text-4xl">
            Full-stack capabilities built for modern product teams.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            I build reliable experiences across frontend, backend, data, and product workflows with a strong focus on maintainability, speed, and clarity.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {chips.map((tag) => {
            const count = tag === 'All' ? skills.length : skills.filter((skill) => skill.category === tag).length
            const isActive = activeTag === tag

            return (
              <button
                key={tag}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveTag(tag)}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7c5cff] focus-visible:ring-offset-2 ${
                  isActive
                    ? 'border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/10'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <span>{tag}</span>
                <span
                  className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                    isActive ? 'bg-white/15 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {filteredSkills.length === 0 ? (
          <div className="rounded-[16px] border border-dashed border-slate-300 bg-white/60 px-6 py-10 text-center text-sm text-slate-600">
            No skills available in this category yet.
          </div>
        ) : (
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(15.5rem, 1fr))' }}>
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
