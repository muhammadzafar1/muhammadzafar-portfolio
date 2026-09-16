import { useEffect, useMemo, useState } from 'react'

const DATA = [
  { name: 'React', mono: 'R', tag: 'Frontend', score: 96, brand: '#61DAFB', note: 'Builds polished, component-driven interfaces.', yrs: '4+', use: 'Daily' },
  { name: 'JavaScript', mono: 'JS', tag: 'Frontend', score: 94, brand: '#F7DF1E', note: 'Turns ideas into responsive client experiences.', yrs: '5+', use: 'Daily' },
  { name: 'Node.js', mono: 'N', tag: 'Backend', score: 90, brand: '#5FA04E', note: 'Powers fast APIs and server-side workflows.', yrs: '4+', use: 'Daily' },
  { name: 'Express', mono: 'E', tag: 'Backend', score: 88, brand: '#000000', note: 'Delivers clean backend routes and middleware.', yrs: '4+', use: 'Daily' },
  { name: 'MongoDB', mono: 'M', tag: 'Database', score: 89, brand: '#4FAA41', note: 'Stores flexible data for product and app features.', yrs: '3+', use: 'Weekly' },
  { name: 'SQL', mono: 'SQL', tag: 'Database', score: 84, brand: '#336791', note: 'Queries and structures reliable relational data.', yrs: '3+', use: 'Weekly' },
  { name: 'Python', mono: 'PY', tag: 'Backend', score: 82, brand: '#3776AB', note: 'Supports automation and business logic tooling.', yrs: '3+', use: 'Weekly' },
  { name: 'Tailwind', mono: 'TW', tag: 'Design', score: 92, brand: '#06B6D4', note: 'Shapes elegant, consistent interfaces at speed.', yrs: '3+', use: 'Daily' },
  { name: 'Figma', mono: 'F', tag: 'Design', score: 80, brand: '#F24E1E', note: 'Creates thoughtful, user-centered product flows.', yrs: '2+', use: 'Weekly' },
  { name: 'HTML', mono: 'H', tag: 'Frontend', score: 97, brand: '#E34F26', note: 'Builds strong semantic foundations for every page.', yrs: '6+', use: 'Daily' },
  { name: 'CSS', mono: 'C', tag: 'Frontend', score: 95, brand: '#1572B6', note: 'Refines layout, spacing, and visual polish.', yrs: '6+', use: 'Daily' },
  { name: 'REST APIs', mono: 'API', tag: 'Backend', score: 88, brand: '#8B5CF6', note: 'Connects systems with clean, scalable integrations.', yrs: '4+', use: 'Daily' },
]

export default function Skills() {
  const [activeTag, setActiveTag] = useState('All')
  const [reducedMotion, setReducedMotion] = useState(false)
  const [ringReady, setRingReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches)

    updateMotionPreference()

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateMotionPreference)
      return () => mediaQuery.removeEventListener('change', updateMotionPreference)
    }

    mediaQuery.addListener(updateMotionPreference)
    return () => mediaQuery.removeListener(updateMotionPreference)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const frameId = window.requestAnimationFrame(() => setRingReady(true))
    return () => window.cancelAnimationFrame(frameId)
  }, [])

  const chips = useMemo(() => {
    if (!DATA.length) return ['All']
    return ['All', ...new Set(DATA.map((skill) => skill.tag).filter(Boolean))]
  }, [])

  const filteredSkills = useMemo(() => {
    if (!DATA.length) return []
    if (activeTag === 'All') return DATA
    return DATA.filter((skill) => skill.tag === activeTag)
  }, [activeTag])

  return (
    <section id="skills" className="w-full scroll-mt-24 bg-[#f5f7fb] py-16 sm:py-20">
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
            const count = tag === 'All' ? DATA.length : DATA.filter((skill) => skill.tag === tag).length
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
            {filteredSkills.map((skill, index) => {
              const radius = 22
              const circumference = 2 * Math.PI * radius
              const score = Math.max(0, Math.min(Number(skill.score) || 0, 100))
              const dashOffset = circumference - (score / 100) * circumference
              const delay = reducedMotion ? 0 : index * 70

              return (
                <article
                  key={`${skill.name}-${index}`}
                  className="group relative rounded-[16px] border border-slate-200 bg-white p-4 shadow-[0_12px_24px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(15,23,42,0.12)]"
                >
                  <div className="absolute right-4 top-4 text-[12px] font-bold text-slate-700">{score}%</div>

                  <div className="flex items-center gap-3">
                    <div className="relative flex h-[52px] w-[52px] items-center justify-center">
                      <svg
                        width="52"
                        height="52"
                        viewBox="0 0 60 60"
                        className="-rotate-90"
                        role="img"
                        aria-label={`${skill.name} ${score}%`}
                      >
                        <circle
                          cx="30"
                          cy="30"
                          r={radius}
                          fill="none"
                          stroke="rgba(148, 163, 184, 0.22)"
                          strokeWidth="5"
                        />
                        <circle
                          cx="30"
                          cy="30"
                          r={radius}
                          fill="none"
                          stroke={skill.brand || '#7c5cff'}
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={ringReady && !reducedMotion ? dashOffset : circumference}
                          style={{
                            transition: reducedMotion ? 'none' : 'stroke-dashoffset 1s ease',
                            transitionDelay: `${delay}ms`,
                          }}
                        />
                      </svg>

                      <span className="absolute inset-0 grid place-items-center text-[10px] font-black tracking-[0.08em] text-slate-800">
                        {skill.mono || skill.name.slice(0, 2).toUpperCase()}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold text-slate-900">{skill.name}</h3>
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                        {skill.tag || 'General'}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 min-h-[56px] text-sm leading-6 text-slate-600">
                    {skill.note || 'Developing high-quality digital experiences.'}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 text-[11px] font-semibold text-slate-600">
                    <span>{skill.yrs || '1+'}</span>
                    <span>{skill.use || 'Regularly'}</span>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
