import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Bell, ChevronDown, Lock, Menu, Search, Sparkles, X } from 'lucide-react'
import { app, nav } from '../config'
import { useContact } from './ContactModal'
import { Avatar } from './ui'

function Sidebar({ open, onClose }) {
  const { openContact } = useContact()
  const Logo = app.logo
  return (
    <>
      <div onClick={onClose} className={`fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm transition lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`} />
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-slate-950 text-slate-300 transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center gap-3 border-b border-white/5 px-6">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-lg shadow-brand-500/30">
            <Logo className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-bold leading-tight text-white">{app.name}</p>
            <p className="truncate text-[11px] text-slate-500">{app.tagline}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-500 hover:text-white lg:hidden"><X className="h-5 w-5" /></button>
        </div>

        <nav className="scrollbar-thin flex-1 space-y-6 overflow-y-auto px-3 py-5">
          {nav.map((section) => (
            <div key={section.title}>
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">{section.title}</p>
              <div className="space-y-0.5">
                {section.items.map((item) =>
                  item.to ? (
                    <NavLink
                      key={item.label}
                      to={item.to}
                      end
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                          isActive
                            ? 'bg-gradient-to-r from-brand-500/20 to-brand-500/5 text-white ring-1 ring-inset ring-brand-400/20'
                            : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
                        }`
                      }
                    >
                      <item.icon className="h-[18px] w-[18px]" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && <span className="rounded-md bg-brand-500/20 px-1.5 py-0.5 text-[10px] font-bold text-brand-300">{item.badge}</span>}
                    </NavLink>
                  ) : (
                    <button
                      key={item.label}
                      onClick={() => openContact(item.label)}
                      className="group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-white/5 hover:text-slate-200"
                    >
                      <item.icon className="h-[18px] w-[18px]" />
                      <span className="flex-1 text-left">{item.label}</span>
                      <Lock className="h-3.5 w-3.5 text-slate-600 transition group-hover:text-brand-400" />
                    </button>
                  ),
                )}
              </div>
            </div>
          ))}
        </nav>

        <div className="relative m-3 overflow-hidden rounded-2xl border border-brand-400/20 bg-gradient-to-br from-brand-600/30 via-brand-700/10 to-transparent p-4">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-500/30 blur-2xl" />
          <Sparkles className="relative h-5 w-5 text-brand-300" />
          <p className="relative mt-2 text-sm font-semibold text-white">Unlock the full version</p>
          <p className="relative mt-1 text-xs leading-relaxed text-slate-400">Backend, auth, database, mobile apps & every module.</p>
          <button onClick={() => openContact('Complete ' + app.name)} className="relative mt-3 w-full rounded-lg bg-white py-2 text-xs font-bold text-slate-900 transition hover:bg-brand-50">
            Get complete project
          </button>
        </div>
      </aside>
    </>
  )
}

function Topbar({ onMenu }) {
  const { openContact } = useContact()
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200/70 bg-white/80 px-4 backdrop-blur-xl sm:px-6">
      <button onClick={onMenu} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"><Menu className="h-5 w-5" /></button>
      <div className="relative hidden max-w-md flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input placeholder={app.searchPlaceholder || 'Search anything…'} className="input border-transparent bg-slate-100/80 pl-10 focus:bg-white" />
        <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-slate-200 bg-white px-1.5 text-[10px] font-semibold text-slate-400 md:block">⌘K</kbd>
      </div>
      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <span className="hidden items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200 md:inline-flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" /> Demo preview
        </span>
        <button onClick={() => openContact('Notifications & Alerts')} className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>
        <button className="flex items-center gap-2.5 rounded-xl py-1 pl-1 pr-2 hover:bg-slate-100">
          <Avatar name={app.user.name} size="sm" />
          <div className="hidden text-left leading-tight md:block">
            <p className="text-sm font-semibold text-slate-800">{app.user.name}</p>
            <p className="text-[11px] text-slate-500">{app.user.role}</p>
          </div>
          <ChevronDown className="hidden h-4 w-4 text-slate-400 md:block" />
        </button>
      </div>
    </header>
  )
}

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { openContact } = useContact()
  return (
    <div className="min-h-screen">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-72">
        <Topbar onMenu={() => setOpen(true)} />
        <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:py-8">
          <Outlet />
        </main>
        <footer className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 px-6 pb-8 text-xs text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} {app.name} · UI demo by <a href="https://nayaprayog.com/" target="_blank" rel="noreferrer" className="font-semibold text-slate-500 hover:text-brand-600">Naya Prayog Technologies</a></p>
          <button onClick={() => openContact('Complete ' + app.name)} className="font-semibold text-brand-600 hover:underline">Need the complete project? Contact us →</button>
        </footer>
      </div>
    </div>
  )
}
