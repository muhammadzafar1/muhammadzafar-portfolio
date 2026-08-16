import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaBriefcase,
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
  FaBlog
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
  FaLaptopCode
}

export default function Projects() {
  const { projects, loading, error } = useProjects()
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredProjects = useMemo(() => {
    const normalizedProjects = projects.filter((project) => project && (project.category || 'Other') !== 'All')
    if (activeFilter === 'All') return normalizedProjects
    return normalizedProjects.filter((project) => (project.category || 'Other') === activeFilter)
  }, [activeFilter, projects])

  return (
    <section id="projects" className="bg-white min-h-screen w-full scroll-mt-20 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-center gap-6 text-center">
          <div className="max-w-3xl">
            <p className="text-4xl font-bold uppercase tracking-wider text-primary sm:text-5xl">My Projects</p>
            <h2 className="mt-4 text-lg font-semibold text-slate-600">Premium work built for modern brands</h2>
          </div>
          <a href="#projects" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:text-primary">
            View All Projects →
          </a>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-5 py-3 text-sm font-semibold transition ${
                activeFilter === filter
                  ? 'border-[#2563EB] bg-[#2563EB] text-white shadow-soft'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse rounded-[16px] border border-slate-200 bg-white p-6 shadow-soft">
                <div className="mb-5 h-16 w-16 rounded-xl bg-slate-100" />
                <div className="h-5 w-3/4 rounded-full bg-slate-100" />
                <div className="mt-4 h-4 w-full rounded-full bg-slate-100" />
                <div className="mt-2 h-4 w-2/3 rounded-full bg-slate-100" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-[16px] border border-red-200 bg-red-50 p-10 text-center text-red-700 shadow-soft">{error}</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => {
              const IconComponent = iconMap[project.icon] || FaCode
              const liveUrl = project.liveUrl || project.liveDemo || ''
              const githubUrl = project.githubUrl || project.github || ''
              const statusLabel = project.featured ? 'Featured' : project.status || 'New'

              return (
                <motion.article
                  key={project._id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6 }}
                  viewport={{ once: true }}
                  className="group flex h-full flex-col rounded-[16px] border border-[#E5E7EB] bg-white p-0 shadow-soft transition duration-300 hover:shadow-lg hover:shadow-[#2563EB]/10"
                >
                  <div className="flex h-full flex-col p-6">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-[#2563EB] shadow-sm transition duration-300 group-hover:scale-105 group-hover:bg-[#eff6ff]">
                        <IconComponent className="text-xl" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${
                            statusLabel === 'Featured'
                              ? 'bg-[#eff6ff] text-[#1d4ed8]'
                              : 'bg-[#ecfeff] text-[#0f766e]'
                          }`}
                        >
                          {statusLabel}
                        </span>
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-700">
                          {(project.category || 'Other')}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-slate-900">{project.title}</h3>
                      <p className="text-sm leading-7 text-slate-600">{project.description}</p>
                    </div>

                    <div className="my-5 h-px w-full bg-[#E5E7EB]" />

                    <div className="mb-5">
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Tech Stack</p>
                      <div className="flex flex-wrap gap-2">
                        {(project.technologies || []).map((tech) => (
                          <span
                            key={`${project._id}-${tech}`}
                            className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto flex flex-wrap gap-3 pt-2">
                      {liveUrl && (
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition duration-200 hover:bg-[#1d4ed8]"
                        >
                          <FaExternalLinkAlt className="text-xs" />
                          Live Demo
                        </a>
                      )}
                      {githubUrl && (
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition duration-200 hover:-translate-y-0.5 hover:border-[#2563EB] hover:text-[#2563EB]"
                        >
                          <FaGithub className="text-sm" />
                          GitHub
                        </a>
                      )}
                    </div>
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
