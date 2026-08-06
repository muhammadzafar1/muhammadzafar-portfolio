import { FiArrowUpRight } from 'react-icons/fi'
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from 'react-icons/fa'
import logoImage from '../assets/images/logo.png'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' }
]

const socials = [
  { label: 'GitHub', icon: <FaGithub className="h-5 w-5" />, url: 'https://github.com/muhammadzafar1', colorClass: 'text-slate-800', hoverClass: 'hover:bg-slate-800' },
  { label: 'LinkedIn', icon: <FaLinkedin className="h-5 w-5" />, url: 'https://www.linkedin.com/in/muhammad-zafar-90a7b2348', colorClass: 'text-sky-600', hoverClass: 'hover:bg-sky-600' },
  { label: 'WhatsApp', icon: <FaWhatsapp className="h-5 w-5" />, url: 'https://wa.me/923024973943', colorClass: 'text-emerald-500', hoverClass: 'hover:bg-emerald-500' },
  { label: 'Email', icon: <FaEnvelope className="h-5 w-5" />, url: 'mailto:muhammadzafar3939@gmail.com', colorClass: 'text-red-500', hoverClass: 'hover:bg-red-500' }
]

const skills = [
  { label: 'React' },
  { label: 'Node.js' },
  { label: 'Express.js' },
  { label: 'MongoDB' },
  { label: 'JavaScript' },
  { label: 'Tailwind CSS' }
]

const services = [
  { label: 'Frontend Development' },
  { label: 'Backend Development' },
  { label: 'MERN Stack Development' },
  { label: 'REST API Development' },
  { label: 'Database Design' },
  { label: 'Responsive Web Design' }
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/95 py-12 min-h-[90vh] flex flex-col justify-center">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 lg:flex-row lg:items-center lg:justify-start lg:gap-24 xl:gap-32">
        <div>
          <a href="#home" className="flex items-center gap-3 text-lg font-semibold text-slate-900">
            <img
              src={logoImage}
              alt="Muhammad Zafar Logo"
              className="h-12 w-12 rounded-2xl object-contain"
            />
            <span>Muhammad Zafar</span>
          </a>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">I am a passionate Full Stack Web Developer specializing in the MERN Stack. I create modern, responsive, and scalable web applications with clean code, intuitive user interfaces, and efficient backend systems.</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Navigate</p>
            <div className="mt-4 space-y-3">
              {links.map((link) => (
                <a key={link.label} href={link.href} className="block text-sm text-slate-700 hover:text-primary">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Contact</p>
            <div className="mt-4 space-y-3">
              {socials.map((social) => (
                <a key={social.label} href={social.url} target="_blank" rel="noreferrer" className="block text-sm capitalize text-slate-700 hover:text-primary">
                  {social.label}
                </a>
              ))}
            </div>
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Skills</p>
            <div className="mt-4 space-y-3">
              {skills.map((skill) => (
                <p key={skill.label} className="block text-sm text-slate-700">
                  {skill.label}
                </p>
              ))}
            </div>
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Services</p>
            <div className="mt-4 space-y-3">
              {services.map((service) => (
                <p key={service.label} className="block text-sm text-slate-700">
                  {service.label}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-6">
        <div className="flex items-center justify-center gap-3">
          {socials.map((social) => (
            <a key={social.label} href={social.url} target="_blank" rel="noreferrer" className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:text-white ${social.colorClass} ${social.hoverClass}`} aria-label={social.label}>
              {social.icon}
            </a>
          ))}
        </div>
        <div className="mt-8 border-t border-slate-200 pt-8 text-center">
          <p className="text-sm text-slate-500">© 2026 Muhammad Zafar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
