import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Building2, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

const tabs = [
  { to: '/app', label: 'Report an issue', end: true },
  { to: '/app/tickets', label: 'Active tickets' },
  { to: '/app/account', label: 'Account' },
]

export default function UserLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-3">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-white"><Building2 size={16} /></span>
          PropDesk <span className="text-xs font-normal text-zinc-500">Resident portal</span>
        </div>
        <button onClick={() => { logout(); navigate('/login') }} className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900">
          <LogOut size={16} /> Sign out
        </button>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <p className="text-xs font-medium text-indigo-600">Your home, taken care of</p>
        <h1 className="mt-1 text-[28px] font-semibold">How can we help?</h1>
        <nav className="mt-4 flex gap-6 border-b border-zinc-200">
          {tabs.map((t) => (
            <NavLink key={t.to} to={t.to} end={t.end}
              className={({ isActive }) => `-mb-px border-b-2 pb-3 text-sm ${isActive ? 'border-indigo-600 font-medium text-indigo-600' : 'border-transparent text-zinc-500'}`}>
              {t.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-6"><Outlet /></div>
      </main>
    </div>
  )
}
