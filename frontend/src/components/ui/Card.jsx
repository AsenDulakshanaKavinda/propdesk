export function Card({ className = '', children }) {
  return <section className={`rounded-xl border border-zinc-200 bg-white p-5 ${className}`}>{children}</section>
}

export function StatCard({ label, value, note, tone = 'text-zinc-500' }) {
  return (
    <Card>
      <p className="text-sm text-zinc-600">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
      <p className={`mt-1 text-xs ${tone}`}>{note}</p>
    </Card>
  )
}

export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-[28px] font-semibold leading-9">{title}</h1>
        {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
      </div>
      <div className="flex gap-3">{children}</div>
    </div>
  )
}
