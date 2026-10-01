const RING_CIRCUMFERENCE = 176

const safePercent = (value) => {
  const numeric = Number(value)
  if (!Number.isFinite(numeric)) return 0
  return Math.min(100, Math.max(0, numeric))
}

export default function SkillCard({ skill }) {
  const pct = safePercent(skill?.percent)
  const color = skill?.color || '#2563eb'
  const offset = RING_CIRCUMFERENCE * (1 - pct / 100)

  return (
    <article
      className="skill-card group relative rounded-[16px] border border-slate-200 bg-white p-4 shadow-[0_12px_24px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(15,23,42,0.12)]"
      style={{ '--c': color }}
    >
      <div className="absolute right-4 top-4 text-[12px] font-bold text-slate-700">{pct}%</div>

      <div className="flex items-center gap-3">
        <div className="relative flex h-[52px] w-[52px] items-center justify-center">
          <svg
            width="52"
            height="52"
            viewBox="0 0 64 64"
            className="-rotate-90"
            role="img"
            aria-label={`${skill?.name || 'Skill'} ${pct}%`}
          >
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="rgba(148, 163, 184, 0.22)"
              strokeWidth="5"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="var(--c)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              className="ring-value"
              style={{ '--off': offset }}
            />
          </svg>

          <span className="absolute inset-0 grid place-items-center text-[10px] font-black tracking-[0.08em] text-slate-800">
            {skill?.short || (skill?.name || '').slice(0, 2).toUpperCase()}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-slate-900">{skill?.name}</h3>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            {skill?.category || 'General'}
          </p>
        </div>
      </div>

      <p className="mt-4 min-h-[56px] text-sm leading-6 text-slate-600">
        {skill?.description || 'Developing high-quality digital experiences.'}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 text-[11px] font-semibold text-slate-600">
        <span>{skill?.years || '1+'}</span>
        <span>{skill?.frequency || 'Regularly'}</span>
      </div>
    </article>
  )
}
