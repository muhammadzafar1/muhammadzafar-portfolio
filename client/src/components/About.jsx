import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="min-h-screen w-full scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-4xl font-bold uppercase tracking-wider text-primary sm:text-5xl">About Me</p>
         
        </div>

        <h2 className="mb-8 text-2xl font-bold text-slate-900">Biography</h2>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-xl font-semibold leading-8 text-slate-900">
              I am a passionate Full Stack Web Developer specializing in the MERN Stack. I create modern, responsive, and
              scalable web applications with clean code, intuitive user interfaces, and efficient backend systems.
            </h3>
            <a
              href="#contact"
              className="mt-8 inline-flex h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 text-sm font-semibold text-slate-900 shadow-soft hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Read More
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Name</p>
                <p className="mt-3 text-lg font-semibold text-slate-900">Muhammad Zafar</p>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/90">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Email</p>
                <p className="mt-3 text-lg font-semibold text-slate-900 break-words">muhammadzafar3939@gmail.com</p>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/90">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Location</p>
                <p className="mt-3 text-lg font-semibold text-slate-900">Lahore, Pakistan</p>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/90">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Freelance</p>
                <p className="mt-3 text-lg font-semibold text-slate-900">Available</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
