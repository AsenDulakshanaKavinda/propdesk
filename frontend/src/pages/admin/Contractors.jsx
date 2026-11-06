import { Plus } from 'lucide-react'
import { Card, PageHeader } from '../../components/ui/Card.jsx'
import Badge from '../../components/ui/Badge.jsx'
import Button from '../../components/ui/Button.jsx'
import { contractors } from '../../data/mock.js'

export default function Contractors() {
  return (
    <>
      <PageHeader title="The right team for every job." subtitle="Trusted local contractors, verified credentials and live availability.">
        <Button variant="secondary">Export directory</Button><Button icon={Plus}>Invite contractor</Button>
      </PageHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contractors.map((c) => (
          <Card key={c.id}>
            <h2 className="font-semibold">{c.name}</h2>
            <p className="mb-3 text-xs text-zinc-500">{c.trade}</p>
            <Badge>{c.status}</Badge>
            <p className="mt-4 text-sm">★ {c.rating} · {c.jobs} jobs completed</p>
            <p className="mb-4 text-xs text-zinc-500">Next availability: {c.next}</p>
            <Button variant="secondary" className="w-full">View profile</Button>
          </Card>
        ))}
      </div>
    </>
  )
}
