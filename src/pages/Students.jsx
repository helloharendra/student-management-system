import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Search, UserPlus } from 'lucide-react'
import { Avatar, Badge, PageHeader, Segmented } from '../components/ui'
import { useContact } from '../components/ContactModal'
import { students } from '../data'

const tone = { Active: 'green', 'At risk': 'red', Graduated: 'violet', 'On leave': 'amber' }

export default function Students() {
  const { openContact } = useContact()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('All')
  const list = students.filter((s) => (status === 'All' || s.status === status) && `${s.name} ${s.id} ${s.program}`.toLowerCase().includes(q.toLowerCase()))

  return (
    <>
      <PageHeader title="Student directory" subtitle={`${list.length} students`}
        actions={<button onClick={() => openContact('Student Registration Form')} className="btn-primary"><UserPlus className="h-4 w-4" /> Register student</button>} />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, ID or programme" className="input pl-9" /></div>
        <Segmented options={['All', 'Active', 'At risk', 'On leave', 'Graduated']} value={status} onChange={setStatus} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {list.map((s) => (
          <button key={s.id} onClick={() => (s.id === 'STU-24017' ? navigate('/profile') : openContact(`${s.name} – 360° profile`))} className="card group overflow-hidden text-left animate-fade-up transition hover:-translate-y-1 hover:shadow-xl">
            <div className="h-16 bg-gradient-to-r from-brand-500 to-brand-300" />
            <div className="-mt-8 px-5 pb-5">
              <Avatar name={s.name} size="lg" />
              <div className="mt-3 flex items-start justify-between gap-2">
                <div><p className="font-semibold text-slate-900">{s.name}</p><p className="text-xs text-slate-400">{s.id}</p></div>
                <Badge tone={tone[s.status]}>{s.status}</Badge>
              </div>
              <p className="mt-3 text-sm text-slate-600">{s.program}</p>
              <p className="flex items-center gap-1 text-xs text-slate-400">{s.year} · <MapPin className="h-3 w-3" />{s.city}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4 text-center">
                <div><p className="text-lg font-bold text-slate-900">{s.att}%</p><p className="text-[11px] text-slate-400">Attendance</p></div>
                <div><p className="text-lg font-bold text-slate-900">{s.cgpa}</p><p className="text-[11px] text-slate-400">CGPA</p></div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  )
}
