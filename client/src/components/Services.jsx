import { motion, useReducedMotion } from 'framer-motion'
import { FiLayers, FiServer, FiDatabase, FiLayout, FiPhone, FiShield } from 'react-icons/fi'

const services = [
  { title: 'Frontend Development', description: 'Modern user interfaces with React and Tailwind UI.', icon: FiLayout },
  { title: 'Backend Development', description: 'Scalable APIs and application services with Node.js.', icon: FiServer },
  { title: 'MERN Stack Development', description: 'Full stack applications with React, Express, and MongoDB.', icon: FiLayers },
  { title: 'REST API Development', description: 'Clean endpoints, validation, and integration-ready services.', icon: FiShield },
  { title: 'Database Design', description: 'Efficient MongoDB schemas and query optimization.', icon: FiDatabase },
  { title: 'Responsive Web Design', description: 'Pixel-perfect layouts for desktop, tablet, and mobile.', icon: FiPhone }
]

const accentStyles = [
  'bg-violet-100 text-violet-600',
  'bg-teal-100 text-teal-600'
]

export default function Services() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="services" className="w-full scroll-mt-20 bg-[#f6f7fb] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 text-center sm:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#6d5ef8] sm:text-sm">// What I Do</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-900 sm:text-5xl">Services</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon
            const accentClass = accentStyles[index % accentStyles.length]
            const delay = index * 0.07

            return (
              <motion.article
                key={service.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
                whileInView={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay, ease: 'easeOut' }}
                whileHover={prefersReducedMotion ? undefined : { y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
                className="group relative overflow-hidden rounded-[18px] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)]"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#6d5ef8] via-[#7c5cff] to-[#17b6a7] transition-transform duration-300 ease-out group-hover:scale-x-100" />

                <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${accentClass} shadow-sm transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-3`}>
                  <Icon size={22} strokeWidth={1.8} />
                </div>

                <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 opacity-0 translate-x-[-8px] transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100">
                    Learn more
                    <span aria-hidden="true">→</span>
                  </span>

                  <span className="h-2 w-2 rounded-full bg-slate-200 transition-colors duration-300 group-hover:bg-[#6d5ef8]" />
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
