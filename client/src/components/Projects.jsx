import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaBriefcase,
  FaBlog,
  FaChartBar,
  FaCode,
  FaComments,
  FaDatabase,
  FaExternalLinkAlt,
  FaGithub,
  FaHome,
  FaLaptopCode,
  FaServer,
  FaShoppingCart,
  FaTasks,
  FaUser,
} from 'react-icons/fa'
import { useProjects } from '../hooks/useProjects'

const filters = ['All', 'Frontend', 'Backend', 'Full Stack', 'React', 'Node.js', 'Other']

const iconMap = {
  FaShoppingCart,
  FaChartBar,
  FaTasks,
  FaHome,
  FaBlog,
  FaUser,
  FaCode,
  FaDatabase,
  FaServer,
  FaComments,
  FaBriefcase,
  FaLaptopCode,
}

const normalizeFilter = (value) => {
  if (!value) return 'other'

  return String(value)
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .trim()
}

const normalizeProjectCategories = (project) => {
  const categories = Array.isArray(project?.categories)
    ? project.categories
    : Array.isArray(project?.category)
      ? project.category
      : [project?.category || 'Other']

  return categories
    .map((category) => {
      const normalized = normalizeFilter(category)
      if (normalized === 'full stack' || normalized === 'full-stack') return 'full stack'
      if (normalized === 'nodejs' || normalized === 'node.js') return 'node.js'
      if (normalized === 'frontend') return 'frontend'
      if (normalized === 'backend') return 'backend'
      if (normalized === 'react') return 'react'
      return 'other'
    })
    .filter(Boolean)
}

export default function Projects() {
  const { projects, loading, error } = useProjects()
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredProjects = useMemo(() => {
    if (!Array.isArray(projects)) return []

    const normalizedProjects = projects.filter((project) => project)

    if (activeFilter === 'All') return normalizedProjects

    const target = normalizeFilter(activeFilter)

    return normalizedProjects.filter((project) =>
      normalizeProjectCategories(project).includes(target),
    )
  }, [activeFilter, projects])

  return (
    <section
      id="projects"
      className="w-full scroll-mt-24 bg-[#f6f7fb] py-16 sm:py-20 lg:py-24"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center gap-5 text-center">
          <h2 className="text-4xl font-extrabold tracking-[-0.05em] text-[#14172b] sm:text-5xl">
            My Projects
          </h2>
          <p className="text-base text-[#6b7085] sm:text-lg">
            Premium work built for modern brands
          </p>

          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#6d5ef8] to-[#8b7bff] px-6 py-3 text-sm font-bold text-white shadow-[0_18px_35px_rgba(109,94,248,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_40px_rgba(109,94,248,0.42)]"
          >
            View All Projects <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {filters.map((filter) => {
            const isActive = activeFilter === filter

            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d5ef8] focus-visible:ring-offset-2 ${
                  isActive
                    ? 'border-transparent bg-gradient-to-r from-[#6d5ef8] to-[#8b7bff] text-white shadow-[0_16px_30px_rgba(109,94,248,0.32)]'
                    : 'border-[#e7e9f3] bg-white text-[#6b7085] hover:border-[#6d5ef8] hover:text-[#6d5ef8]'
                }`}
              >
                {filter}
              </button>
            )
          })}
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border border-[#e7e9f3] bg-white p-6 shadow-md"
              >
                <div className="mb-5 h-12 w-12 rounded-xl bg-slate-200" />
                <div className="h-5 w-2/3 rounded-full bg-slate-200" />
                <div className="mt-4 h-4 w-full rounded-full bg-slate-200" />
                <div className="mt-2 h-4 w-5/6 rounded-full bg-slate-200" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center text-red-700">
            {error}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#dfe3ee] bg-white/40 px-6 py-12 text-center text-sm text-[#6b7085]">
            No projects in this category yet.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project, index) => {
              const IconComponent = project.icon && iconMap[project.icon] ? iconMap[project.icon] : FaCode
              const liveUrl = project.liveUrl || project.liveDemo || ''
              const githubUrl = project.githubUrl || project.github || ''
              const statusLabel = project.featured ? 'Completed' : project.status || 'Completed'
              const displayCategory =
                project.category ||
                (Array.isArray(project.categories) && project.categories[0]) ||
                'Other'
              const palette = index % 2 === 0
                ? {
                    soft: 'bg-[#eeecff] text-[#6d5ef8]',
                    pill: 'bg-[#eeecff] text-[#6d5ef8]',
                    border: 'border-[#e7e9f3]',
                    button: 'bg-gradient-to-r from-[#6d5ef8] to-[#8b7bff]',
                    tag: 'text-[#6d5ef8]',
                  }
                : {
                    soft: 'bg-[#e3f8f5] text-[#17b6a7]',
                    pill: 'bg-[#e3f8f5] text-[#17b6a7]',
                    border: 'border-[#e7e9f3]',
                    button: 'bg-gradient-to-r from-[#17b6a7] to-[#25c2b5]',
                    tag: 'text-[#17b6a7]',
                  }

              return (
                <motion.article
                  key={project._id || `${project.title}-${index}`}
                  initial={{ opacity: 0, scale: 0.98, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  whileHover={{ y: -6 }}
                  className="group flex h-full flex-col rounded-2xl border border-[#e7e9f3] bg-[#ffffff] p-5 shadow-md transition-all duration-200 hover:shadow-xl"
                >
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${palette.soft}`}>
                      <IconComponent className="h-5 w-5" aria-hidden="true" />
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${palette.pill}`}>
                        {statusLabel}
                      </span>
                      <span className="rounded-full border border-[#e7e9f3] bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6b7085]">
                        {displayCategory}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-[#14172b]">{project.title}</h3>
                    <p className="text-sm leading-6 text-[#6b7085]">{project.description}</p>
                  </div>

                  <div className="mt-5 border-t border-[#e7e9f3] pt-4">
                    <p className={`mb-3 text-[10px] font-bold uppercase tracking-[0.22em] ${palette.tag}`}>
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(project.technologies || []).map((tech) => (
                        <span
                          key={`${project._id || project.title}-${tech}`}
                          className="rounded-full border border-[#e7e9f3] bg-[#f7f8fb] px-2.5 py-1 text-[11px] font-semibold text-[#6b7085]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3 pt-1">
                    {liveUrl && (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 ${palette.button}`}
                      >
                        <FaExternalLinkAlt className="h-3.5 w-3.5" aria-hidden="true" />
                        Live Demo
                      </a>
                    )}

                    {githubUrl && (
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#e7e9f3] bg-white px-4 py-2.5 text-sm font-semibold text-[#14172b] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#6d5ef8] hover:text-[#6d5ef8]"
                      >
                        <FaGithub className="h-3.5 w-3.5" aria-hidden="true" />
                        GitHub
                      </a>
                    )}
                  </div>
                </motion.article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
