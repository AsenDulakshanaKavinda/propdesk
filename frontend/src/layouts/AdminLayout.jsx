import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Building2, ClipboardList, HardHat, LayoutGrid, LogOut, BarChart3, Search, Bell } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

const nav = [
  { to: '/admin', label: 'Overview', icon: LayoutGrid, end: true },
  { to: '/admin/work-orders', label: 'Work orders', icon: ClipboardList },
  { to: '/admin/properties', label: 'Properties', icon: Building2 },
  { to: '/admin/contractors', label: 'Contractors', icon: HardHat },
  { to: '/admin/reports', label: 'Reports', icon: BarChart3 },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-48 shrink-0 flex-col bg-zinc-900 p-3 text-zinc-300 md:flex">
        <div className="mb-6 flex items-center gap-2 px-2 py-3 text-xl font-semibold text-white">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-600"><Building2 size={18} /></span> PropDesk
        </div>
        <nav className="flex flex-col gap-1">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${isActive ? 'bg-indigo-600/30 text-white' : 'hover:bg-zinc-800'}`}>
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>
        <button onClick={() => { logout(); navigate('/login') }} className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-zinc-800">
          <LogOut size={16} /> Sign out
        </button>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="flex items-center gap-3 border-b border-zinc-200 bg-white px-6 py-3">
          <div className="relative max-w-md flex-1">
            <Search size={16} className="absolute left-3 top-3 text-zinc-400" />
            <input placeholder="Search units, orders, contractors…" className="h-10 w-full rounded-lg border border-zinc-200 bg-slate-50 pl-9 pr-3 text-sm" />
          </div>
          <Bell size={18} className="ml-auto text-zinc-500" />
          <span className="grid h-9 w-9 place-items-center rounded-full bg-indigo-100 text-sm font-medium text-indigo-700">{user.name[0].toUpperCase()}</span>
        </header>
        <main className="mx-auto max-w-6xl p-6"><Outlet /></main>
      </div>
    </div>
  )
}
