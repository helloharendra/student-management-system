import { Link } from 'react-router-dom'
import { AlertTriangle, Award, CalendarCheck, GraduationCap } from 'lucide-react'
import { Badge, Card, Hero, HeroStat, Person, StatCard } from '../components/ui'
import { DonutChart, TrendChart } from '../components/Charts'
import { byProgram, enrolTrend, students } from '../data'

export default function Dashboard() {
  const atRisk = students.filter((s) => s.att < 80 || s.status === 'At risk')
  return (
    <>
      <Hero
        eyebrow="Student information system"
        title="Every student's journey in one profile."
        subtitle="Admissions, attendance, academics, documents and guardian details, all searchable in seconds."
        side={<div className="grid grid-cols-2 gap-3"><HeroStat label="Active students" value="1,270" /><HeroStat label="New this year" value="+286" /></div>}
      >
        <Link to="/profile" className="btn bg-white text-brand-700 hover:bg-brand-50">Open a 360° profile</Link>
      </Hero>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total students" value="1,270" delta="2.7%" icon={GraduationCap} />
        <StatCard label="Avg. attendance" value="88.6%" delta="1.1%" icon={CalendarCheck} tone="emerald" />
        <StatCard label="Avg. CGPA" value="8.12" delta="0.09" icon={Award} tone="amber" />
        <StatCard label="At-risk students" value="23" delta="-6" icon={AlertTriangle} tone="rose" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card title="Enrolment trend" className="xl:col-span-2"><TrendChart data={enrolTrend} series={[{ key: 'students', name: 'Students' }]} /></Card>
        <Card title="Students by programme"><DonutChart data={byProgram} centerValue="1,270" centerLabel="Students" /></Card>
      </div>
      <Card title="Needs attention" subtitle="Low attendance or academic risk" className="mt-6">
        <div className="grid gap-3 md:grid-cols-2">
          {atRisk.map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-xl border border-rose-100 bg-rose-50/40 p-4">
              <Person name={s.name} sub={`${s.program} · ${s.year}`} />
              <div className="text-right"><Badge tone="red">{s.att}% attendance</Badge><p className="mt-1 text-xs text-slate-400">CGPA {s.cgpa}</p></div>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}
