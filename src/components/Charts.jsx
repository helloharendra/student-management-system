import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { brandHex } from '../theme'

const axis = { stroke: '#94a3b8', fontSize: 12, tickLine: false, axisLine: false }
const palette = [brandHex[500], '#38bdf8', '#f59e0b', '#f43f5e', '#10b981', '#a78bfa']

function ChartTooltip({ active, payload, label, format = (v) => v }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-slate-200 bg-white/95 px-3 py-2 text-xs shadow-xl backdrop-blur">
      {label && <p className="mb-1 font-semibold text-slate-700">{label}</p>}
      {payload.map((p) => (
        <p key={p.dataKey} className="flex items-center gap-2 text-slate-500">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color || p.payload.fill }} />
          {p.name}: <span className="font-semibold text-slate-800">{format(p.value)}</span>
        </p>
      ))}
    </div>
  )
}

/** series: [{ key, name }] — first series uses the brand colour */
export function TrendChart({ data, x = 'label', series, height = 280, format }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
        <defs>
          {series.map((s, i) => (
            <linearGradient key={s.key} id={`g-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={palette[i]} stopOpacity={0.28} />
              <stop offset="100%" stopColor={palette[i]} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey={x} {...axis} />
        <YAxis {...axis} tickFormatter={format} />
        <Tooltip content={<ChartTooltip format={format} />} />
        {series.map((s, i) => (
          <Area key={s.key} type="monotone" dataKey={s.key} name={s.name} stroke={palette[i]} strokeWidth={2.5} fill={`url(#g-${s.key})`} />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function BarsChart({ data, x = 'label', series, height = 280, format, stacked }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 8, left: -12, bottom: 0 }} barGap={6}>
        <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey={x} {...axis} />
        <YAxis {...axis} tickFormatter={format} />
        <Tooltip cursor={{ fill: '#f1f5f9' }} content={<ChartTooltip format={format} />} />
        {series.map((s, i) => (
          <Bar key={s.key} dataKey={s.key} name={s.name} fill={palette[i]} radius={stacked ? 0 : [6, 6, 0, 0]} maxBarSize={28} stackId={stacked ? 'a' : undefined} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

/** data: [{ name, value }] */
export function DonutChart({ data, height = 220, centerLabel, centerValue }) {
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius="68%" outerRadius="92%" paddingAngle={3} stroke="none">
            {data.map((d, i) => <Cell key={d.name} fill={palette[i % palette.length]} />)}
          </Pie>
          <Tooltip content={<ChartTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      {centerValue && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="text-2xl font-bold text-slate-900">{centerValue}</p>
            <p className="text-xs text-slate-500">{centerLabel}</p>
          </div>
        </div>
      )}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-2 text-xs text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: palette[i % palette.length] }} />
            <span className="flex-1 truncate">{d.name}</span>
            <span className="font-semibold text-slate-800">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
