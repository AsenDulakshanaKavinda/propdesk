import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, Send } from 'lucide-react'
import { Card, PageHeader } from '../../components/ui/Card.jsx'
import Badge from '../../components/ui/Badge.jsx'
import Button from '../../components/ui/Button.jsx'
import { Field, Input, Select, Textarea } from '../../components/ui/Field.jsx'
import { contractors, workOrders } from '../../data/mock.js'

export default function WorkOrderDetail() {
  const { id } = useParams()
  const wo = workOrders.find((w) => w.id === id)
  const [status, setStatus] = useState(wo?.status)
  const [override, setOverride] = useState(false)
  const [msgs, setMsgs] = useState([{ from: 'Jordan Miller · 9:43 AM', text: 'I can be home after 1 PM. Please call before entering.' }])
  const [draft, setDraft] = useState('')

  if (!wo) return <p className="text-sm text-zinc-500">Work order not found. <Link to="/admin/work-orders" className="text-indigo-600">Back to work orders</Link></p>

  const send = () => { if (draft.trim()) { setMsgs([...msgs, { from: 'You · now', text: draft }]); setDraft('') } }

  return (
    <>
      <Link to="/admin/work-orders" className="mb-3 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900"><ChevronLeft size={16} /> Work orders</Link>
      <PageHeader title={wo.title} subtitle={`${wo.id} · Unit ${wo.unit} · ${wo.category}`}>
        <Badge>{wo.severity}</Badge><Badge>{status}</Badge>
      </PageHeader>

      {status === 'Awaiting approval' && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
          <span>Approval required: {wo.severity} severity + estimate over $500</span>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setOverride(!override)}>Reject & override</Button>
            <Button onClick={() => setStatus('Dispatched')}>Approve dispatch</Button>
          </div>
        </div>
      )}
      {status === 'Dispatched' && <div className="mb-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">Dispatch approved. The contractor and resident have been notified.</div>}

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <h2 className="mb-2 font-semibold">Resident’s description</h2>
            <p className="text-sm text-zinc-600">“Water collects around the sink when I turn it on. It started this morning and is getting worse.”</p>
          </Card>
          {override && (
            <Card>
              <h2 className="mb-3 font-semibold">Manual override</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Reason *"><Select options={['Preferred vendor unavailable', 'Cost too high', 'Resident request']} /></Field>
                <Field label="Replacement contractor *"><Select options={contractors.filter((c) => c.status === 'Available').map((c) => c.name)} /></Field>
                <Field label="Approved budget cap *"><Input defaultValue="$720.00" /></Field>
              </div>
              <div className="mt-4"><Field label="Decision note *"><Textarea defaultValue="Resident requested an earlier visit." /></Field></div>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setOverride(false)}>Cancel override</Button>
                <Button onClick={() => { setStatus('Dispatched'); setOverride(false) }}>Save & dispatch</Button>
              </div>
            </Card>
          )}
          <Card>
            <h2 className="mb-3 font-semibold">Conversation & internal notes</h2>
            <div className="space-y-2">
              {msgs.map((m, i) => <div key={i} className="rounded-lg bg-slate-50 p-3 text-sm"><p className="text-xs text-zinc-500">{m.from}</p>{m.text}</div>)}
            </div>
            <div className="mt-4 flex gap-2">
              <Input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Write a message…" />
              <Button icon={Send} onClick={send}>Send reply</Button>
            </div>
          </Card>
        </div>
        <Card className="h-fit">
          <h2 className="mb-3 font-semibold">Routing & ownership</h2>
          <p className="text-xs text-zinc-500">Suggested contractor</p>
          <p className="mb-3 text-sm font-medium">{wo.contractor}</p>
          <p className="text-xs text-zinc-500">Estimate</p>
          <p className="text-2xl font-semibold">${wo.cost}.00</p>
          <p className="mt-4 text-xs text-zinc-500">All decisions and edits are retained in the audit trail.</p>
        </Card>
      </div>
    </>
  )
}
