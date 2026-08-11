import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import { useProjects } from '../hooks/useProjects'
import placeholder from '../assets/images/placeholder.svg'

const filters = ['All', 'Frontend', 'Backend', 'MERN', 'Full Stack']

export default function Projects() {
  const { projects, loading, error } = useProjects()
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects
    return projects.filter((project) => project.category === activeFilter)
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
                  ? 'border-[#2563EB] bg-[#eff6ff] text-[#1d4ed8] shadow-soft'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse rounded-[16px] border border-slate-200 bg-white p-6 shadow-soft">
                <div className="mb-5 h-44 rounded-[16px] bg-slate-100" />
                <div className="h-5 w-3/4 rounded-full bg-slate-100" />
                <div className="mt-4 h-4 w-1/2 rounded-full bg-slate-100" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-[16px] border border-red-200 bg-red-50 p-10 text-center text-red-700 shadow-soft">{error}</div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProjects.map((project) => (
              <motion.article
                key={project._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true }}
                className="group overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-white shadow-soft transition duration-300 hover:shadow-lg hover:shadow-primary/90"
              >
                  <div className="relative overflow-hidden rounded-t-[16px] bg-slate-100">
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    <motion.img
                      src={project.image || placeholder}
                      alt={project.title || 'Project image'}
                      loading="lazy"
                      className="h-full w-full object-cover rounded-t-[16px]"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="rounded-full bg-[#eff6ff] px-3 py-1 text-xs font-semibold text-[#1d4ed8]">Featured</span>
                    )}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-slate-900">{project.title}</h3>
                    <p className="text-sm leading-7 text-slate-600">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={`${project._id}-${tech}`} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-[#eff6ff] hover:text-[#1d4ed8]">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-[#2563EB] hover:text-[#2563EB]">
                      <FaGithub /> GitHub
                    </a>
                    <a href={project.liveDemo} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-[#1d4ed8]">
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
