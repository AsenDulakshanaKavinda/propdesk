import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Plus } from 'lucide-react'
import { Card, StatCard, PageHeader } from '../../components/ui/Card.jsx'
import Badge from '../../components/ui/Badge.jsx'
import Button from '../../components/ui/Button.jsx'
import Modal from '../../components/ui/Modal.jsx'
import { workOrders } from '../../data/mock.js'

export default function Overview() {
  const [queue, setQueue] = useState(workOrders.filter((w) => w.status === 'Awaiting approval'))
  const [confirm, setConfirm] = useState(null)
  const approve = () => { setQueue(queue.filter((q) => q.id !== confirm.id)); setConfirm(null) }

  return (
    <>
      <PageHeader title="Maintenance, in motion." subtitle="A clear view of every issue. A confident next step for every team.">
        <Button variant="secondary">Export report</Button>
        <Button icon={Plus}>Create work order</Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Pending approvals" value={String(queue.length).padStart(2, '0')} note="Need attention today" tone="text-amber-700" />
        <StatCard label="Active dispatches" value="24" note="Across 8 properties" />
        <StatCard label="Avg resolution time" value="4.2h" note="↓ 18% vs. last month" tone="text-emerald-700" />
        <StatCard label="SLA breaches" value="02" note="2 require escalation" tone="text-rose-600" />
      </div>

      <h2 className="mb-1 mt-8 text-base font-semibold">Approval queue</h2>
      <p className="mb-3 text-sm text-zinc-500">Human oversight for critical issues or estimates over $500</p>
      <div className="grid gap-4 lg:grid-cols-2">
        {queue.length === 0 && <Card className="lg:col-span-2 text-center text-sm text-zinc-500">You’re all caught up. No dispatches need approval.</Card>}
        {queue.map((w) => (
          <Card key={w.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-zinc-500"><Badge>{w.severity}</Badge>{w.id} / {w.category}</div>
              <span className="text-xl font-semibold">${w.cost}</span>
            </div>
            <Link to={`/admin/work-orders/${w.id}`} className="mt-3 block text-base font-semibold hover:text-indigo-600">{w.title}</Link>
            <p className="text-sm text-zinc-500">Unit {w.unit}</p>
            <p className="mt-3 flex items-center gap-2 rounded-lg bg-indigo-50 p-3 text-xs text-indigo-700"><Sparkles size={14} /> AI suggests {w.ai}</p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div><p className="text-sm font-medium">{w.contractor}</p><p className="text-xs text-zinc-500">★ {w.rating} · ETA {w.eta}</p></div>
              <div className="flex gap-2">
                <Link to={`/admin/work-orders/${w.id}`}><Button variant="secondary">Reject & override</Button></Link>
                <Button onClick={() => setConfirm(w)}>Approve dispatch</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={!!confirm} title="Approve this dispatch?" onClose={() => setConfirm(null)}>
        <p className="text-sm text-zinc-600">The contractor will be notified and a visit will be scheduled with the resident.</p>
        <p className="mt-3 text-sm font-medium">{confirm?.id} · {confirm?.contractor} · ${confirm?.cost}.00</p>
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirm(null)}>Cancel</Button>
          <Button onClick={approve}>Confirm dispatch</Button>
        </div>
      </Modal>
    </>
  )
}
