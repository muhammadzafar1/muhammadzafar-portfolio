import { motion } from 'framer-motion'
import { FiLayers, FiServer, FiDatabase, FiLayout, FiPhone, FiShield } from 'react-icons/fi'

const services = [
  { title: 'Frontend Development', description: 'Modern user interfaces with React and Tailwind UI.', icon: FiLayout },
  { title: 'Backend Development', description: 'Scalable APIs and application services with Node.js.', icon: FiServer },
  { title: 'MERN Stack Development', description: 'Full stack applications with React, Express, and MongoDB.', icon: FiLayers },
  { title: 'REST API Development', description: 'Clean endpoints, validation, and integration-ready services.', icon: FiShield },
  { title: 'Database Design', description: 'Efficient MongoDB schemas and query optimization.', icon: FiDatabase },
  { title: 'Responsive Web Design', description: 'Pixel-perfect layouts for desktop, tablet, and mobile.', icon: FiPhone }
]

export default function Services() {
  return (
    <section id="services" className="min-h-screen w-full scroll-mt-20 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 text-center">
          <p className="text-4xl font-bold uppercase tracking-wider text-primary sm:text-5xl">Services</p>
          <h2 className="mt-4 text-lg font-semibold text-slate-600">What I provide</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/90"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-primary/10 text-primary">
                  <Icon size={22} />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">{service.title}</h3>
                <p className="mt-4 text-slate-600">{service.description}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
