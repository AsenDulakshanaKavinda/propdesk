import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus } from 'lucide-react'
import { Card, PageHeader } from '../../components/ui/Card.jsx'
import DataTable from '../../components/DataTable.jsx'
import Badge from '../../components/ui/Badge.jsx'
import Button from '../../components/ui/Button.jsx'
import { workOrders } from '../../data/mock.js'

const tabs = ['All', 'Triage', 'Awaiting approval', 'Dispatched', 'Completed']

export default function WorkOrders() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('All')
  const [q, setQ] = useState('')
  const rows = useMemo(
    () => workOrders.filter((w) => (tab === 'All' || w.status === tab) && `${w.id} ${w.title} ${w.unit}`.toLowerCase().includes(q.toLowerCase())),
    [tab, q],
  )

  const columns = [
    { key: 'title', label: 'Issue / unit', render: (r) => <><p className="font-medium">{r.id} · {r.title}</p><p className="text-xs text-zinc-500">{r.unit}</p></> },
    { key: 'category', label: 'Category' },
    { key: 'severity', label: 'Severity', render: (r) => <Badge>{r.severity}</Badge> },
    { key: 'cost', label: 'Estimate', render: (r) => `$${r.cost}` },
    { key: 'contractor', label: 'Contractor' },
    { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
    { key: 'updated', label: 'Updated' },
  ]

  return (
    <>
      <PageHeader title="Every issue, accounted for." subtitle="Prioritize your portfolio’s maintenance from intake to resolution.">
        <Button variant="secondary">Export</Button>
        <Button icon={Plus}>Create work order</Button>
      </PageHeader>
      <nav className="mb-4 flex flex-wrap gap-5 border-b border-zinc-200">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`-mb-px border-b-2 pb-3 text-sm ${tab === t ? 'border-indigo-600 font-medium text-indigo-600' : 'border-transparent text-zinc-500'}`}>{t}</button>
        ))}
      </nav>
      <Card className="p-0">
        <div className="relative p-4">
          <Search size={16} className="absolute left-7 top-7 text-zinc-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Unit, order ID or issue…" className="h-10 w-full max-w-sm rounded-lg border border-zinc-200 pl-9 pr-3 text-sm" />
        </div>
        <DataTable columns={columns} rows={rows} onRowClick={(r) => navigate(`/admin/work-orders/${r.id}`)} />
      </Card>
    </>
  )
}
