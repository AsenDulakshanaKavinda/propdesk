import { Building2 } from 'lucide-react'

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-screen place-items-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center gap-2 text-xl font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-600 text-white"><Building2 size={18} /></span> PropDesk
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="mb-5 mt-1 text-sm text-zinc-500">{subtitle}</p>
          {children}
        </div>
        <p className="mt-4 text-center text-sm text-zinc-500">{footer}</p>
      </div>
    </div>
  )
}
