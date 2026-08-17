import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="min-h-screen w-full scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-4xl font-bold uppercase tracking-wider text-primary sm:text-5xl">About Me</p>
         
        </div>

        <h2 className="mb-8 text-2xl font-bold text-slate-900">My Journey</h2>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-xl font-semibold leading-8 text-slate-900 pt-4">
             I am a Full Stack Web Developer with a strong focus on building modern, responsive, and user-friendly web applications. I work across both frontend and backend development, using HTML5, CSS3, JavaScript, React.js, Next.js, and Tailwind CSS to create engaging user interfaces, while leveraging Node.js and Express.js to build scalable backend applications and REST APIs. I also have hands-on experience with MongoDB, MongoDB Atlas, and SQL/MySQL for database management. I enjoy transforming ideas into complete, functional web solutions and continuously improving my skills by building real-world projects with clean, maintainable, and efficient code.
            </h3>
            <a
              href="#contact"
              className= "bg-blue-700 mt-8 inline-flex h-14 items-center justify-center rounded-full border border-slate-200  px-8 text-sm font-semibold text-white shadow-soft hover:-translate-y-0.5 hover:bg-slate-50  hover:text-blue-700"
            >
            Contact
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
