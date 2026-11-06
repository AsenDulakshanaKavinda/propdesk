import { Plus } from 'lucide-react'
import { Card, PageHeader, StatCard } from '../../components/ui/Card.jsx'
import DataTable from '../../components/DataTable.jsx'
import Badge from '../../components/ui/Badge.jsx'
import Button from '../../components/ui/Button.jsx'
import { properties } from '../../data/mock.js'

const columns = [
  { key: 'name', label: 'Property', render: (r) => <><p className="font-medium">{r.name}</p><p className="text-xs text-zinc-500">{r.address}</p></> },
  { key: 'units', label: 'Units' }, { key: 'occupancy', label: 'Occupancy' }, { key: 'open', label: 'Open orders' },
  { key: 'spend', label: 'MTD spend' }, { key: 'manager', label: 'Manager' },
  { key: 'health', label: 'Health', render: (r) => <Badge>{r.health}</Badge> },
]

export default function Properties() {
  return (
    <>
      <PageHeader title="Your portfolio, connected." subtitle="Building records, resident context and maintenance health in one place.">
        <Button variant="secondary">Import properties</Button><Button icon={Plus}>Add property</Button>
      </PageHeader>
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Properties" value="12" note="Across the Northeast" />
        <StatCard label="Total units" value="842" note="96.4% occupied" />
        <StatCard label="Open work orders" value="24" note="Across 8 properties" />
        <StatCard label="Monthly spend" value="$28.4k" note="Within $35k budget" tone="text-emerald-700" />
      </div>
      <Card className="p-0"><DataTable columns={columns} rows={properties} /></Card>
    </>
  )
}
