import { useState } from 'react'
import { Download, FileCheck2, Mail, MapPin, Phone, Upload } from 'lucide-react'
import { Avatar, Badge, Card, Progress, Segmented } from '../components/ui'
import { BarsChart, TrendChart } from '../components/Charts'
import { useContact } from '../components/ContactModal'
import { profile as p } from '../data'

export default function Profile() {
  const { openContact } = useContact()
  const [tab, setTab] = useState('Overview')

  return (
    <>
      <div className="card relative mb-6 overflow-hidden animate-fade-up">
        <div className="h-32 bg-gradient-to-r from-brand-700 via-brand-500 to-cyan-400"><div className="bg-grid h-full w-full opacity-40" /></div>
        <div className="flex flex-col gap-4 px-6 pb-6 sm:flex-row sm:items-end">
          <div className="-mt-10 rounded-full ring-4 ring-white"><Avatar name={p.name} size="lg" /></div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2"><h1 className="text-2xl font-bold text-slate-900">{p.name}</h1><Badge tone="green">{p.status}</Badge><Badge tone="violet" dot={false}>Merit scholar</Badge></div>
            <p className="text-sm text-slate-500">{p.id} · {p.program} · {p.year}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => openContact('Certificates (TC / Bonafide)')} className="btn-ghost"><FileCheck2 className="h-4 w-4" /> Certificate</button>
            <button onClick={() => openContact('Student Report PDF')} className="btn-primary"><Download className="h-4 w-4" /> Report</button>
          </div>
        </div>
      </div>

      <div className="mb-6"><Segmented options={['Overview', 'Academics', 'Documents']} value={tab} onChange={setTab} /></div>

      {tab === 'Overview' && (
        <div className="grid gap-6 xl:grid-cols-3">
          <Card title="Personal details">
            <dl className="grid grid-cols-2 gap-4 text-sm">
              {[['Date of birth', p.dob], ['Blood group', p.blood], ['Gender', 'Female'], ['City', p.city]].map(([k, v]) => <div key={k}><dt className="text-xs text-slate-400">{k}</dt><dd className="font-semibold text-slate-800">{v}</dd></div>)}
            </dl>
            <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-slate-400" />{p.email}</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-slate-400" />{p.phone}</p>
              <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />{p.address}</p>
            </div>
            <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Guardian</p>
              <p className="mt-1 font-semibold text-slate-800">{p.guardian.name} <span className="font-normal text-slate-400">· {p.guardian.relation}</span></p>
              <p className="text-slate-500">{p.guardian.phone} · {p.guardian.occupation}</p>
            </div>
          </Card>
          <Card title="Attendance" subtitle="Monthly %">
            <BarsChart data={p.attendance} series={[{ key: 'pct', name: 'Attendance' }]} height={220} />
          </Card>
          <Card title="Timeline">
            <ol className="relative space-y-5 border-l-2 border-brand-100 pl-5">
              {p.timeline.map((t) => (
                <li key={t.what} className="relative">
                  <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full bg-brand-500 ring-4 ring-brand-100" />
                  <p className="text-xs font-semibold text-brand-600">{t.when}</p>
                  <p className="text-sm text-slate-700">{t.what}</p>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      )}

      {tab === 'Academics' && (
        <div className="grid gap-6 xl:grid-cols-2">
          <Card title="SGPA progression"><TrendChart data={p.semesters} series={[{ key: 'sgpa', name: 'SGPA' }]} height={260} /></Card>
          <Card title="Semester 3 subjects">
            <div className="space-y-5">
              {p.subjects.map((s) => (
                <div key={s.name}>
                  <div className="mb-2 flex justify-between text-sm"><span className="font-semibold text-slate-700">{s.name}</span><span className="text-slate-500">{s.marks}/100 · <b className="text-brand-600">{s.grade}</b></span></div>
                  <Progress value={s.marks} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === 'Documents' && (
        <Card title="Documents" action={<button onClick={() => openContact('Secure Document Uploads')} className="btn-primary px-3 py-1.5 text-xs"><Upload className="h-3.5 w-3.5" /> Upload</button>}>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {p.documents.map((d) => (
              <button key={d} onClick={() => openContact('Document Viewer')} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-brand-300 hover:bg-brand-50/40">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-brand-600"><FileCheck2 className="h-5 w-5" /></span>
                <div><p className="font-semibold text-slate-800">{d}</p><p className="text-xs text-emerald-600">Verified</p></div>
              </button>
            ))}
          </div>
        </Card>
      )}
    </>
  )
}
