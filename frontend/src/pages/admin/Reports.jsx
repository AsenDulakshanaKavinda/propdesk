import { Card, PageHeader, StatCard } from '../../components/ui/Card.jsx'
import Button from '../../components/ui/Button.jsx'
import { spend, weekly } from '../../data/mock.js'

export default function Reports() {
  const maxW = Math.max(...weekly.map((x) => x.n))
  const maxS = Math.max(...spend.map((x) => x.v))
  return (
    <>
      <PageHeader title="Know what’s working." subtitle="Service performance, spend and resident outcomes across your portfolio.">
        <Button variant="secondary">Export report</Button>
      </PageHeader>
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Completed orders" value="188" note="+12% vs September" tone="text-emerald-700" />
        <StatCard label="Mean resolution" value="4.2h" note="↓ 18% vs September" tone="text-emerald-700" />
        <StatCard label="SLA compliance" value="96.8%" note="182 on time · 6 breached" tone="text-emerald-700" />
        <StatCard label="Maintenance spend" value="$28.4k" note="$35k budget · 81% used" />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="font-semibold">Completed work orders</h2>
          <p className="mb-4 text-xs text-zinc-500">Weekly volume · October 2026</p>
          <div className="flex h-48 items-end gap-6">
            {weekly.map((x) => (
              <div key={x.w} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                <span className="text-xs font-medium text-indigo-600">{x.n}</span>
                <div className="w-full rounded-t-md bg-indigo-300" style={{ height: `${(x.n / maxW) * 80}%` }} />
                <span className="text-xs text-zinc-500">{x.w}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 font-semibold">Spend by category</h2>
          <div className="space-y-4">
            {spend.map((s) => (
              <div key={s.k}>
                <div className="mb-1 flex justify-between text-sm"><span>{s.k}</span><span>${s.v.toLocaleString()}</span></div>
                <div className="h-2 rounded-full bg-indigo-100"><div className="h-2 rounded-full bg-indigo-600" style={{ width: `${(s.v / maxS) * 100}%` }} /></div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
