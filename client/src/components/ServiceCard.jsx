export default function ServiceCard({ service, index, onOpen }) {
  const Icon = service.icon
  const accentClass = index % 2 === 0 ? 'bg-violet-100 text-violet-600' : 'bg-teal-100 text-teal-600'

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative overflow-hidden rounded-[18px] border border-slate-200 bg-white p-6 text-left shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all duration-300 ease-out hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6d5ef8] focus-visible:ring-offset-2"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#6d5ef8] via-[#7c5cff] to-[#17b6a7] transition-transform duration-300 ease-out group-hover:scale-x-100" />

      <div className={`pointer-events-none mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${accentClass} shadow-sm transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-3`}>
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
    </button>
  )
}
