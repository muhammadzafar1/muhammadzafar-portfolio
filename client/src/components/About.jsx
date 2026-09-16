import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { FiAward, FiTrendingUp } from 'react-icons/fi'
import profileImage from '../assets/images/hero.png'

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

const defaultLinks = [
  {
    icon: FaGithub,
    label: 'GitHub',
    meta: '1.4k commits',
    href: 'https://github.com',
  },
  {
    icon: FaLinkedinIn,
    label: 'LinkedIn',
    meta: 'Professional network',
    href: 'https://linkedin.com',
  },
  {
    icon: FaXTwitter,
    label: 'Twitter / X',
    meta: 'Thoughts & updates',
    href: 'https://x.com',
  },
  {
    icon: FiTrendingUp,
    label: 'LeetCode',
    meta: 'Problem solving',
    href: 'https://leetcode.com',
  },
]

export default function About({
  photoUrl = profileImage,
  name = 'Muhammad Zafar',
  title = 'Full Stack Developer',
  badgeText = 'MERN Stack',
  eyebrowLabel = 'Full Stack Developer',
  headline = 'I build digital products that feel clear, fast, and human.',
  paragraph1 = 'I design and develop modern web experiences with a strong focus on clean architecture, responsive interfaces, and scalable product thinking. From front-end flows to back-end systems, I build solutions that are both polished and practical.',
  paragraph2 = 'My work combines user-centered design, dependable APIs, and efficient database strategies to solve real-world problems. I care about writing maintainable code, creating thoughtful user experiences, and shipping products that perform well across devices and use cases.',
  links = defaultLinks,
}) {
  const prefersReducedMotion = useReducedMotion()
  const [activeTag, setActiveTag] = useState('All')

  const chips = useMemo(() => ['All', ...new Set(DATA.map((skill) => skill.tag))], [])
  const filteredSkills = useMemo(
    () => (activeTag === 'All' ? DATA : DATA.filter((skill) => skill.tag === activeTag)),
    [activeTag],
  )

  return (
    <section
      id="about"
      className="w-full scroll-mt-24 bg-[#F2F3F6] py-16 sm:py-20 lg:py-24"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="overflow-hidden rounded-[22px] border border-[#E4E7EC] bg-[#FFFFFF] shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
        >
          <div className="grid gap-0 md:grid-cols-[22rem_minmax(0,1fr)]">
            <div className="relative min-h-[420px] bg-[#111827] md:min-h-full">
              <img
                src={photoUrl}
                alt={name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050b0a]/80 via-[#050b0a]/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <div className="space-y-3 text-white">
                  <h2
                    className="text-3xl font-semibold leading-none tracking-[-0.04em] text-white"
                    style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                  >
                    {name}
                  </h2>
                  <p className="text-sm text-[#d3f0e8]">{title}</p>

                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[10px] font-medium tracking-[0.12em] text-[#eaf5f1] uppercase backdrop-blur-sm">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M12 2.75L14.7 7.2L19.8 7.95L16.35 11.35L17.1 16.45L12 14.2L6.9 16.45L7.65 11.35L4.2 7.95L9.3 7.2L12 2.75Z"
                        fill="currentColor"
                      />
                    </svg>
                    {badgeText}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center p-6 sm:p-8 lg:p-10">
              <div className="w-full">
                <p className="mb-4 text-base font-semibold text-[#2E5B4E]">{eyebrowLabel}</p>

                <h1
                  className="max-w-[22ch] text-4xl leading-[0.95] tracking-[-0.05em] text-[#161A22] sm:text-5xl lg:text-[4rem]"
                  style={{ fontFamily: 'Fraunces, Georgia, serif', fontWeight: 400 }}
                >
                  {headline}
                </h1>

                <div className="mt-6 space-y-4 text-base leading-7 text-[#6B7280] md:text-[1.02rem]">
                  <p>{paragraph1}</p>
                  <p>{paragraph2}</p>
                </div>

                <div className="mt-8 border-y border-[#E4E7EC]">
                  {links.map(({ icon: Icon, label, meta, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Visit ${label}`}
                      className="group flex items-center justify-between gap-4 border-b border-[#E4E7EC] py-4 text-left transition-colors duration-200 last:border-b-0 hover:bg-[#F7FAF9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E5B4E] focus-visible:ring-offset-2"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7EFEC] text-base text-[#2E5B4E]">
                          <Icon aria-hidden="true" />
                        </span>

                        <span className="min-w-0">
                          <span className="block text-base font-semibold text-[#161A22]">{label}</span>
                          <span className="block text-sm text-[#6B7280]">{meta}</span>
                        </span>
                      </div>

                      <span
                        aria-hidden="true"
                        className="flex-shrink-0 text-xl leading-none text-[#2E5B4E] transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1"
                      >
                        →
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 rounded-[22px] border border-[#E4E7EC] bg-[#FFFFFF] px-4 py-6 shadow-[0_10px_25px_rgba(15,23,42,0.04)] sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <p className="text-sm font-semibold text-[#2E5B4E]">Skills</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#161A22] sm:text-3xl" style={{ fontFamily: 'Fraunces, Georgia, serif' }}>
              Tools I use to build reliable digital products.
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {chips.map((tag) => {
              const count = tag === 'All' ? DATA.length : DATA.filter((skill) => skill.tag === tag).length
              const isActive = activeTag === tag

              return (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveTag(tag)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E5B4E] focus-visible:ring-offset-2 ${
                    isActive
                      ? 'border-[#2E5B4E] bg-[#2E5B4E] text-white'
                      : 'border-[#E4E7EC] bg-[#F8FAF9] text-[#374151] hover:border-[#cfe0d9] hover:bg-white'
                  }`}
                >
                  <span>{tag}</span>
                  <span className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${isActive ? 'bg-white/15 text-white' : 'bg-[#E7EFEC] text-[#2E5B4E]'}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(15.5rem, 1fr))' }}>
            {filteredSkills.map((skill, index) => {
              const radius = 22
              const circumference = 2 * Math.PI * radius
              const dashOffset = circumference - (skill.score / 100) * circumference
              const motionDelay = prefersReducedMotion ? 0 : index * 0.07

              return (
                <motion.article
                  key={`${skill.name}-${index}`}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : { duration: 0.8, ease: 'easeOut', delay: motionDelay }
                  }
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  className="group relative rounded-[16px] border border-[#E4E7EC] bg-[#FFFFFF] p-4 shadow-[0_12px_24px_rgba(15,23,42,0.05)] transition-shadow duration-200 hover:shadow-[0_18px_30px_rgba(15,23,42,0.08)]"
                >
                  <div className="absolute right-4 top-4 text-[12px] font-bold text-[#374151]">{skill.score}%</div>

                  <div className="flex items-center gap-3">
                    <div className="relative flex h-[52px] w-[52px] items-center justify-center">
                      <svg width="52" height="52" viewBox="0 0 60 60" className="-rotate-90" aria-label={`${skill.name} ${skill.score}%`}>
                        <circle cx="30" cy="30" r={radius} fill="none" stroke="rgba(148,163,184,0.22)" strokeWidth="5" />
                        <motion.circle
                          cx="30"
                          cy="30"
                          r={radius}
                          fill="none"
                          stroke={skill.brand}
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          initial={prefersReducedMotion ? { strokeDashoffset: circumference } : { strokeDashoffset: circumference }}
                          whileInView={prefersReducedMotion ? undefined : { strokeDashoffset: dashOffset }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={
                            prefersReducedMotion
                              ? undefined
                              : { duration: 1, ease: 'easeInOut', delay: motionDelay }
                          }
                        />
                      </svg>

                      <span className="absolute inset-0 grid place-items-center text-[10px] font-black tracking-[0.08em] text-[#161A22]">
                        {skill.mono}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-base font-bold text-[#161A22]">{skill.name}</h4>
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6B7280]">{skill.tag}</p>
                    </div>
                  </div>

                  <p className="mt-4 min-h-[56px] text-sm leading-6 text-[#4B5563]">{skill.note}</p>

                  <div className="mt-4 flex items-center justify-between border-t border-[#E4E7EC] pt-3 text-[11px] font-semibold text-[#4B5563]">
                    <span>{skill.yrs}</span>
                    <span>{skill.use}</span>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
