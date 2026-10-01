import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { FiArrowRight, FiCheck, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import useFocusTrap from '../hooks/useFocusTrap'
import useLockBodyScroll from '../hooks/useLockBodyScroll'

export default function ServiceModal({ services, activeIndex, onClose, onChange }) {
  const service = services[activeIndex]
  const dialogRef = useRef(null)
  const bodyRef = useRef(null)
  const titleId = useId().replace(/:/g, '')
  const descriptionId = useId().replace(/:/g, '')

  useLockBodyScroll(Boolean(service))
  useFocusTrap({ isOpen: Boolean(service), dialogRef, onClose })

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = 0
    }
  }, [activeIndex])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      const target = event.target
      const isTextField = target instanceof HTMLElement && target.closest('input, textarea, select')
      if (isTextField) return

      if (event.key === 'ArrowRight') {
        onChange((activeIndex + 1) % services.length)
      }

      if (event.key === 'ArrowLeft') {
        onChange((activeIndex - 1 + services.length) % services.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, onChange, onClose, services.length])

  if (!service) return null

  const nextService = () => onChange((activeIndex + 1) % services.length)
  const previousService = () => onChange((activeIndex - 1 + services.length) % services.length)

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-[#0a1028]/55 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="flex min-h-full items-end justify-center md:items-center md:p-6">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className="animate-slide-up w-full max-w-[680px] rounded-t-[28px] border border-[#e9edf7] bg-white shadow-[0_28px_80px_rgba(15,23,42,0.18)] dark:border-[#232c4b] dark:bg-[#141b33] md:animate-pop-in md:rounded-[28px]"
        >
          <div className="h-[5px] w-full bg-gradient-to-r from-[#7c5cff] to-[#14b8a6]" />

          <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(124,92,255,0.18),_rgba(124,92,255,0)_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(124,92,255,0.2),_rgba(124,92,255,0)_55%)]">
            <div className="flex items-start justify-between gap-4 px-5 pb-4 pt-5 md:px-7 md:pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-[62px] w-[62px] items-center justify-center rounded-[18px] bg-[#7c5cff] text-white shadow-[0_14px_30px_rgba(124,92,255,0.45)]">
                  <service.icon size={24} strokeWidth={1.8} />
                </div>

                <div>
                  <h2 id={titleId} className="text-[1.35rem] font-black tracking-[-0.04em] text-slate-900 dark:text-[#f1f4ff]">
                    {service.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-[#a3aed0]">{service.subtitle}</p>
                </div>
              </div>

              <button
                type="button"
                data-close-button="true"
                onClick={onClose}
                aria-label="Close"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-transform duration-300 hover:rotate-90 hover:bg-slate-50 dark:border-[#232c4b] dark:bg-[#1a2340] dark:text-[#f1f4ff]"
              >
                <FiX size={18} />
              </button>
            </div>

            <div ref={bodyRef} className="max-h-[calc(92dvh-170px)] overflow-y-auto overscroll-contain px-5 pb-5 md:px-7 md:pb-6">
              <div key={activeIndex} className="animate-fade-in">
                <p id={descriptionId} className="text-sm leading-7 text-slate-600 dark:text-[#a3aed0]">
                  {service.lead}
                </p>

                <div className="mt-7">
                  <h3 className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[#7c5cff] dark:text-[#c7b7ff]">
                    What you get
                  </h3>

                  <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3 rounded-2xl bg-[#efeaff] p-3 text-sm text-slate-700 dark:bg-[#241f4d] dark:text-[#f1f4ff]">
                        <span className="mt-[2px] flex h-5 w-5 items-center justify-center rounded-full bg-[#7c5cff] text-[11px] text-white">
                          <FiCheck />
                        </span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-7">
                  <h3 className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[#14b8a6] dark:text-[#7ae9d6]">
                    Tech used
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {service.tech.map((item) => (
                      <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-[#232c4b] dark:bg-[#1a2340] dark:text-[#f1f4ff]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-7">
                  <h3 className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[#7c5cff] dark:text-[#c7b7ff]">
                    How it works
                  </h3>

                  <ol className="relative mt-4 space-y-4">
                    {service.steps.map((step, stepIndex) => (
                      <li key={step.title} className="relative pl-12">
                        {stepIndex !== service.steps.length - 1 && (
                          <span className="absolute left-[15px] top-[32px] h-[calc(100%+8px)] w-[2px] bg-[#7c5cff]/50 dark:bg-[#7c5cff]/50" />
                        )}

                        <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#7c5cff] bg-white text-xs font-bold text-[#7c5cff] dark:border-[#7c5cff] dark:bg-[#141b33] dark:text-[#c7b7ff]">
                          {stepIndex + 1}
                        </span>

                        <div className="pb-2">
                          <p className="text-sm font-bold text-slate-800 dark:text-[#f1f4ff]">{step.title}</p>
                          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-[#a3aed0]">{step.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 dark:border-[#232c4b] dark:bg-[#141b33] md:px-6">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous service"
                  onClick={previousService}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-transform duration-300 hover:-translate-y-0.5 dark:border-[#232c4b] dark:bg-[#1a2340] dark:text-[#f1f4ff]"
                >
                  <FiChevronLeft size={18} />
                </button>
                <span className="min-w-[3.5rem] text-center text-sm font-semibold text-slate-700 dark:text-[#f1f4ff]">
                  {activeIndex + 1}/{services.length}
                </span>
                <button
                  type="button"
                  aria-label="Next service"
                  onClick={nextService}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-transform duration-300 hover:-translate-y-0.5 dark:border-[#232c4b] dark:bg-[#1a2340] dark:text-[#f1f4ff]"
                >
                  <FiChevronRight size={18} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose()
                  window.requestAnimationFrame(() => {
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                  })
                }}
                className="flex-1 rounded-full bg-gradient-to-r from-[#7c5cff] to-[#14b8a6] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_32px_rgba(124,92,255,0.3)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start a project <FiArrowRight className="ml-2 inline" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
