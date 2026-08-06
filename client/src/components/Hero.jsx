import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa'
import { useHero } from '../hooks/useHero'
import { fetchResume } from '../services/api.js'
import heroImage from '../assets/images/hero.png'

const socialLinks = [
  { label: 'GitHub', icon: <FaGithub className="h-4 w-4" />, url: 'https://github.com/muhammadzafar1', colorClass: 'text-slate-800', hoverClass: 'hover:bg-slate-800' },
  { label: 'LinkedIn', icon: <FaLinkedin className="h-4 w-4" />, url: 'https://www.linkedin.com/in/muhammad-zafar-90a7b2348', colorClass: 'text-sky-600', hoverClass: 'hover:bg-sky-600' },
  { label: 'WhatsApp', icon: <FaWhatsapp className="h-4 w-4" />, url: 'https://wa.me/923024973943', colorClass: 'text-emerald-500', hoverClass: 'hover:bg-emerald-500' },
  { label: 'Email', icon: <FaEnvelope className="h-4 w-4" />, url: 'mailto:muhammadzafar3939@gmail.com', colorClass: 'text-red-500', hoverClass: 'hover:bg-red-500' },
]

const techCards = [
  { label: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { label: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { label: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { label: 'Bootstrap 5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { label: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
  { label: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { label: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { label: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { label: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { label: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
]

const cardPositions = [
  { top: '2%', left: '12%' },
  { top: '28%', left: '0%' },
  { top: '56%', left: '4%' },
  { bottom: '8%', left: '18%' },
  { bottom: '-2%', left: '45%' },
  { top: '4%', right: '10%' },
  { top: '32%', right: '0%' },
  { top: '60%', right: '2%' },
  { bottom: '12%', right: '15%' },
  { bottom: '0%', right: '40%' },
]

function AnimatedCard({ tech, style, delay }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-8, 8, -8] }}
      transition={{
        duration: 4 + delay,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse',
      }}
      whileHover={{ y: -8, scale: 1.05 }}
      style={style}
      className="absolute flex min-w-[150px] max-w-[170px] items-center gap-3 rounded-2xl border border-white/80 bg-white/85 p-3 shadow-soft backdrop-blur-xl transition-shadow hover:shadow-lg hover:border-primary"
    >
      <img src={tech.icon} alt={tech.label} className="h-10 w-10 rounded-2xl bg-white p-2" />
      <div>
        <p className="text-[10px] uppercase tracking-[0.32em] text-slate-500">Technology</p>
        <p className="text-sm font-semibold text-slate-900">{tech.label}</p>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const { hero } = useHero()
  const [resume, setResume] = useState(null)

  useEffect(() => {
    fetchResume()
      .then((response) => setResume(response.data))
      .catch(() => setResume(null))
  }, [])

  return (
    <section id="home" className="relative w-full overflow-hidden bg-white min-h-[calc(100vh-80px)] scroll-mt-24">
      <div className="mx-auto flex h-full max-w-7xl flex-col justify-center gap-12 px-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-10">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85 }}
          className="flex w-full flex-col justify-center gap-6 pt-10 lg:w-[48%] lg:pt-0"
        >
          <div className="max-w-xl">
            <p className="mt-4 text-5xl font-semibold leading-tight text-primary sm:text-6xl">Hi, I&apos;m</p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight text-slate-900 sm:text-6xl">Muhammad Zafar</h1>
            <p className="mt-3 text-xl font-medium leading-normal text-slate-900">Full Stack Web Developer</p>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
              I build modern, responsive and scalable web applications using MERN stack and other cutting-edge technologies.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-[#2563EB] to-[#4F46E5] px-8 text-sm font-semibold text-white shadow-soft hover:opacity-95">
              Hire Me
            </a>
            <a href="#projects" className="inline-flex h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50">
              View My Work
            </a>
            {resume?.fileUrl ? (
              <a href={resume.fileUrl} target="_blank" rel="noreferrer" download className="inline-flex h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50">
                Download CV
              </a>
            ) : (
              <button disabled className="inline-flex h-14 items-center justify-center rounded-full border border-slate-200 bg-slate-100 px-8 text-sm font-semibold text-slate-400 shadow-sm">
                No Resume Available
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:text-white ${item.colorClass} ${item.hoverClass}`}
                aria-label={item.label}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85 }}
          className="relative flex w-full justify-center lg:w-[48%]"
        >
          <div className="relative flex h-[560px] w-full max-w-[560px] items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#DBEAFE] via-[#EFF6FF] to-transparent" />
            <div className="absolute inset-10 rounded-full border border-sky-200/70" />
            <div className="absolute inset-16 rounded-full border border-slate-200/40" />
            <div className="absolute inset-24 rounded-full border border-slate-200/30" />
            <div className="absolute left-[10%] top-[12%] h-3 w-3 rounded-full bg-sky-500/80 shadow-[0_0_20px_rgba(56,189,248,0.25)]" />
            <div className="absolute right-[12%] top-[22%] h-2.5 w-2.5 rounded-full bg-slate-900/10" />
            <div className="absolute left-[20%] bottom-[18%] h-2 w-2 rounded-full bg-slate-900/15" />
            <div className="absolute right-[18%] bottom-[18%] h-2.5 w-2.5 rounded-full bg-sky-500/60" />
            <div className="absolute left-[18%] top-[38%] h-[1px] w-16 rounded-full bg-slate-300/50" />
            <div className="absolute right-[20%] top-[40%] h-[1px] w-20 rounded-full bg-slate-300/50" />

            <div className="relative z-10 flex h-[420px] w-[420px] max-w-full items-center justify-center rounded-[36px] border border-slate-200/70 bg-transparent shadow-none">
              <img
                src={hero?.heroImage || heroImage}
                alt="Muhammad Zafar"
                className="h-full w-full rounded-[32px] object-contain"
              />
            </div>

            {techCards.map((tech, index) => (
              <AnimatedCard key={tech.label} tech={tech} style={cardPositions[index]} delay={index * 0.2} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
