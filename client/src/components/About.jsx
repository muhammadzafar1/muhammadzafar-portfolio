import { motion } from 'framer-motion'
import { FaGithub, FaLinkedinIn, FaXTwitter, FaEnvelope } from 'react-icons/fa6'

const defaultLinks = [
  {
    icon: FaGithub,
    label: 'GitHub',
    meta: 'muhammadzafar1',
    href: 'https://github.com/muhammadzafar1',
  },
  {
    icon: FaLinkedinIn,
    label: 'LinkedIn',
    meta: 'Professional profile',
    href: 'https://www.linkedin.com/in/muhammad-zafar-90a7b2348',
  },
  {
    icon: FaXTwitter,
    label: 'Twitter / X',
    meta: '@muhammadzafar1',
    href: 'https://x.com/muhammadzafar1',
  },
  {
    icon: FaEnvelope,
    label: 'Contact',
    meta: 'muhammadzafar3939@gmail.com',
    href: 'mailto:muhammadzafar3939@gmail.com',
  },
]

export default function About({
  name = 'Muhammad Zafar',
  title = 'Full Stack Developer',
  badgeText = 'MERN Stack',
  eyebrowLabel = '// Full Stack Development',
  headline = 'Building fast, scalable web apps from database to browser.',
  paragraph1 = 'I design and develop modern web experiences with a strong focus on clean architecture, responsive interfaces, and scalable product thinking. From front-end flows to back-end systems, I build solutions that are both polished and practical.',
  paragraph2 = 'My work combines user-centered design, dependable APIs, and efficient database strategies to solve real-world problems. I care about writing maintainable code, creating thoughtful user experiences, and shipping products that perform well across devices and use cases.',
  links = defaultLinks,
}) {
  return (
    <section
      id="about"
      className="relative left-1/2 w-screen -ml-[50vw] scroll-mt-24 bg-[#f6f7fb] py-16 sm:py-20 lg:py-24"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="overflow-hidden rounded-2xl border border-[#e7e9f3] bg-white p-6 shadow-lg sm:p-8 lg:p-11"
        >
          <div className="grid gap-8 md:grid-cols-[300px_minmax(0,1fr)] lg:gap-10">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#14172b] via-[#1b1f3b] to-[#23264a] p-6 shadow-xl">
              <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-[#6d5ef8]/25 blur-3xl" />
              <div className="absolute -bottom-10 right-2 text-[7rem] font-black leading-none text-white/6 select-none">
                {'</>'}
              </div>

              <div className="relative z-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b7b8ff]">
                  // By the Numbers
                </p>

                <div className="mt-6 space-y-5">
                  <div className="border-b border-white/10 pb-5">
                    <div className="text-3xl font-black tracking-[-0.06em] text-white">
                      3<span className="text-xl font-semibold text-[#17b6a7]">+ yrs</span>
                    </div>
                    <p className="mt-2 text-sm text-[#a4a8bd]">Building with the MERN stack</p>
                  </div>

                  <div className="border-b border-white/10 pb-5">
                    <div className="text-3xl font-black tracking-[-0.06em] text-white">15+</div>
                    <p className="mt-2 text-sm text-[#a4a8bd]">Projects shipped end-to-end</p>
                  </div>

                  <div className="pb-1">
                    <div className="text-3xl font-black tracking-[-0.06em] text-white">10+</div>
                    <p className="mt-2 text-sm text-[#a4a8bd]">Technologies in daily use</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-full">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#6d5ef8]">
                  {eyebrowLabel}
                </p>

                <h2 className="max-w-[20ch] text-3xl font-bold leading-[1.08] tracking-[-0.05em] text-[#14172b] sm:text-4xl lg:text-[2.65rem]">
                  {headline}
                </h2>

                <div className="mt-6 space-y-4 text-[15px] leading-7 text-[#6b7085] sm:text-base">
                  <p>{paragraph1}</p>
                  <p>{paragraph2}</p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                  {links.map(({ icon: Icon, label, meta, href }, index) => {
                    const isSoftTeal = index % 2 === 1

                    return (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visit ${label}`}
                        className="group rounded-xl border border-[#e7e9f3] bg-[#f7f8fb] p-3 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6d5ef8] focus-visible:ring-offset-2"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${
                              isSoftTeal ? 'bg-[#e3f8f5] text-[#17b6a7]' : 'bg-[#eeecff] text-[#6d5ef8]'
                            }`}
                          >
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                        </div>

                        <div className="mt-3 min-w-0">
                          <p className="text-sm font-semibold text-[#14172b]">{label}</p>
                          <p className="mt-1 text-xs text-[#6b7085]">{meta}</p>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
