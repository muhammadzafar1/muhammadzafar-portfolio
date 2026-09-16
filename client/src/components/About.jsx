import { motion } from 'framer-motion'
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { FiAward, FiTrendingUp } from 'react-icons/fi'

const defaultLinks = [
  {
    icon: FaGithub,
    title: 'GitHub',
    subtitle: '1.4k Commits',
    href: 'https://github.com',
  },
  {
    icon: FaLinkedinIn,
    title: 'LinkedIn',
    subtitle: 'Network',
    href: 'https://linkedin.com',
  },
  {
    icon: FaXTwitter,
    title: 'Twitter/X',
    subtitle: 'Tech Writing',
    href: 'https://x.com',
  },
  {
    icon: FiTrendingUp,
    title: 'LeetCode',
    subtitle: 'Top 1% Global',
    href: 'https://leetcode.com',
  },
]

export default function About({
  photoUrl = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
  name = 'Alex Rivera',
  title = 'Senior Full Stack Architect',
  badgeText = 'Atlas Cert.',
  eyebrowLabel = '// PHILOSOPHY & SYSTEM MINDSET',
  headline = 'Obsessed with low-latency reactivity and resilient database topology.',
  paragraph1 = 'I design and ship digital products that feel instant, dependable, and measurable. Over the last 7 years, I have helped teams turn product vision into resilient systems spanning frontend experiences, API architecture, and data-heavy infrastructure.',
  paragraph2 = 'My engineering philosophy is simple: remove unnecessary complexity, optimize the critical path, and build interfaces that stay fast under real-world load. I work across React, Node.js, cloud platforms, and database design to create software that is both human-centered and operationally robust.',
  links = defaultLinks,
}) {
  return (
    <section id="about" className="w-full scroll-mt-24 bg-[#f5f7fb] py-20 sm:py-24">
      <div className="w-full px-0 sm:px-3 lg:px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="overflow-hidden rounded-none border-y border-slate-700/60 bg-[#0a0e17] shadow-[0_30px_80px_rgba(9,13,22,0.22)] sm:rounded-[24px] sm:border sm:mx-3 lg:mx-4"
        >
          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-10 lg:p-10">
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[300px] overflow-hidden rounded-[16px] shadow-[0_22px_36px_rgba(0,0,0,0.28)]">
                <img
                  src={photoUrl}
                  alt={name}
                  className="h-[340px] w-full object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 bg-slate-950/55 px-4 py-3 backdrop-blur-md">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-lg font-bold text-white">{name}</p>
                      <p className="text-[11px] font-medium text-[#7dd3fc]">{title}</p>
                    </div>

                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-100">
                      <FiAward className="text-[#7c5cff]" />
                      {badgeText}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.26em] text-[#7c5cff] sm:text-[12px]">
                {eyebrowLabel}
              </p>

              <h2 className="max-w-xl text-3xl font-black leading-[1.08] tracking-[-0.04em] text-[#f4f6fb] sm:text-4xl lg:text-[3rem]">
                {headline}
              </h2>

              <div className="mt-6 space-y-4 text-[15px] leading-7 text-[#a8b0c3]">
                <p>{paragraph1}</p>
                <p>{paragraph2}</p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {links.map(({ icon: Icon, title, subtitle, href }, index) => (
                  <a
                    key={`${title}-${index}`}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-xl border border-slate-700/80 bg-[#0d1220] p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#7c5cff]/60 hover:bg-[#111a2d]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-900/80 text-lg text-[#7dd3fc] transition-colors duration-300 group-hover:border-[#7c5cff]/60 group-hover:text-[#7c5cff]">
                        <Icon />
                      </span>

                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-[#f4f6fb]">{title}</span>
                        <span
                          className={`block text-xs ${
                            index === links.length - 1 ? 'text-[#35d4aa]' : 'text-[#a8b0c3]'
                          }`}
                        >
                          {subtitle}
                        </span>
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
