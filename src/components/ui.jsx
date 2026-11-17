import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-6 flex flex-col gap-4 animate-fade-up sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}

export function Card({ title, subtitle, action, children, className = '', bodyClass = 'p-5' }) {
  return (
    <section className={`card min-w-0 animate-fade-up ${className}`}>
      {(title || action) && (
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
          <div>
            <h3 className="font-semibold text-slate-900">{title}</h3>
            {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={bodyClass}>{children}</div>
    </section>
  )
}

const tones = {
  brand: 'from-brand-500 to-brand-600 shadow-brand-500/30',
  emerald: 'from-emerald-400 to-emerald-600 shadow-emerald-500/30',
  amber: 'from-amber-400 to-orange-500 shadow-amber-500/30',
  rose: 'from-rose-400 to-rose-600 shadow-rose-500/30',
  sky: 'from-sky-400 to-blue-600 shadow-sky-500/30',
  violet: 'from-violet-400 to-violet-600 shadow-violet-500/30',
}

export function StatCard({ label, value, delta, icon: Icon, tone = 'brand', hint }) {
  const up = !String(delta || '').startsWith('-')
  return (
    <div className="card group relative overflow-hidden p-5 animate-fade-up transition hover:-translate-y-0.5">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-slate-100 transition group-hover:scale-125" />
      <div className="relative flex items-start justify-between">
        <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
        {delta && (
          <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {String(delta).replace('-', '')}
          </span>
        )}
      </div>
      <p className="relative mt-4 text-sm font-medium text-slate-500">{label}</p>
      <p className="relative mt-1 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
      {hint && <p className="relative mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  )
}

const badgeTones = {
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15',
  amber: 'bg-amber-50 text-amber-700 ring-amber-600/15',
  red: 'bg-rose-50 text-rose-700 ring-rose-600/15',
  blue: 'bg-sky-50 text-sky-700 ring-sky-600/15',
  violet: 'bg-violet-50 text-violet-700 ring-violet-600/15',
  slate: 'bg-slate-100 text-slate-600 ring-slate-500/15',
  brand: 'bg-brand-50 text-brand-700 ring-brand-600/15',
}

export function Badge({ tone = 'slate', dot = true, children }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${badgeTones[tone]}`}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />}
      {children}
    </span>
  )
}

const gradients = [
  'from-rose-400 to-orange-400', 'from-sky-400 to-indigo-500', 'from-emerald-400 to-teal-500',
  'from-violet-400 to-fuchsia-500', 'from-amber-400 to-pink-500', 'from-cyan-400 to-blue-500',
]

export function Avatar({ name = '', size = 'md' }) {
  const initials = name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
  const g = gradients[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % gradients.length]
  const s = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-14 w-14 text-lg' }[size]
  return <div className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br font-bold text-white ring-2 ring-white ${g} ${s}`}>{initials}</div>
}

export function Progress({ value, tone = 'brand' }) {
  const color = { brand: 'from-brand-400 to-brand-600', green: 'from-emerald-400 to-emerald-600', amber: 'from-amber-400 to-orange-500', red: 'from-rose-400 to-rose-600' }[tone]
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700`} style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  )
}

export function Segmented({ options, value, onChange }) {
  return (
    <div className="inline-flex rounded-xl bg-slate-100 p-1">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${value === o ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

/** columns: [{ key, label, render?: (row) => node, align?: 'right' }] */
export function DataTable({ columns, rows, onRowClick }) {
  return (
    <div className="scrollbar-thin overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
            {columns.map((c) => (
              <th key={c.key} className={`whitespace-nowrap px-5 py-3 ${c.align === 'right' ? 'text-right' : ''}`}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, i) => (
            <tr key={row.id ?? i} onClick={() => onRowClick?.(row)} className={`transition hover:bg-slate-50/80 ${onRowClick ? 'cursor-pointer' : ''}`}>
              {columns.map((c) => (
                <td key={c.key} className={`whitespace-nowrap px-5 py-3.5 text-slate-600 ${c.align === 'right' ? 'text-right' : ''}`}>
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Person({ name, sub }) {
  return (
    <div className="flex items-center gap-3">
      <Avatar name={name} size="sm" />
      <div className="leading-tight">
        <p className="font-semibold text-slate-800">{name}</p>
        {sub && <p className="text-xs text-slate-400">{sub}</p>}
      </div>
    </div>
  )
}

export function Hero({ eyebrow, title, subtitle, children, side }) {
  return (
    <div className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-6 text-white shadow-xl shadow-brand-600/20 animate-fade-up sm:p-8">
      <div className="bg-grid absolute inset-0 opacity-50 [mask-image:linear-gradient(to_left,black,transparent)]" />
      <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-brand-300/20 blur-3xl" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          {eyebrow && <p className="text-xs font-semibold uppercase tracking-[.2em] text-white/70">{eyebrow}</p>}
          <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-2 text-sm text-white/80 sm:text-base">{subtitle}</p>}
          {children && <div className="mt-5 flex flex-wrap gap-2">{children}</div>}
        </div>
        {side}
      </div>
    </div>
  )
}

export function HeroStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-inset ring-white/20 backdrop-blur">
      <p className="text-xs text-white/70">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  )
}

export const inr = (n) => '₹' + Number(n).toLocaleString('en-IN')
