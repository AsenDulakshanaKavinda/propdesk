import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, CheckCircle2, ImagePlus, Phone } from 'lucide-react'
import { Card } from '../../components/ui/Card.jsx'
import Button from '../../components/ui/Button.jsx'
import { Field, Textarea } from '../../components/ui/Field.jsx'

const categories = ['Plumbing', 'HVAC', 'Electrical']

export default function ReportIssue() {
  const [category, setCategory] = useState('Plumbing')
  const [urgency, setUrgency] = useState('Standard')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  if (done)
    return (
      <Card className="mx-auto max-w-lg text-center">
        <CheckCircle2 className="mx-auto text-emerald-500" size={36} />
        <h2 className="mt-3 text-xl font-semibold">Request received.</h2>
        <p className="mt-1 text-sm text-zinc-500">Your property team has your request. We’ll send an update once it’s reviewed.</p>
        <Link to="/app/tickets"><Button className="mt-5 w-full">Track this request</Button></Link>
      </Card>
    )

  const submit = () => (description.trim() ? setDone(true) : setError('Add a description so we can send the right person.'))

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <h2 className="text-lg font-semibold">Tell us what’s happening</h2>
        <p className="mb-5 text-sm text-zinc-500">A few details help us send the right person, faster.</p>
        <p className="mb-1.5 text-sm font-medium">Category</p>
        <div className="mb-5 grid grid-cols-3 gap-3">
          {categories.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={`flex h-11 items-center justify-between rounded-lg border px-3 text-sm ${category === c ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-zinc-200'}`}>
              {c} {category === c && <Check size={16} />}
            </button>
          ))}
        </div>
        <p className="mb-1.5 text-sm font-medium">Urgency</p>
        <div className="mb-1 grid grid-cols-2 rounded-lg bg-slate-100 p-1">
          {['Standard', 'Urgent'].map((u) => (
            <button key={u} onClick={() => setUrgency(u)} className={`h-9 rounded-md text-sm ${urgency === u ? 'bg-white font-medium shadow-sm' : 'text-zinc-500'}`}>{u}</button>
          ))}
        </div>
        <p className="mb-5 text-xs text-zinc-500">For immediate danger, call 911. For a building emergency, call the front desk.</p>
        <Field label="Description"><Textarea value={description} onChange={(e) => { setDescription(e.target.value); setError('') }} placeholder="What’s happening, and when did it start?" /></Field>
        {error && <p className="mt-2 text-sm text-rose-600" role="alert">{error}</p>}
        <button className="mt-5 flex h-20 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-zinc-300 text-sm text-zinc-500"><ImagePlus size={18} /> Add photos or drag and drop</button>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs text-zinc-500">We’ll keep you updated at every step.</span>
          <Button onClick={submit}>Submit maintenance request</Button>
        </div>
      </Card>
      <Card className="h-fit bg-slate-100">
        <h2 className="flex items-center gap-2 font-semibold"><Phone size={18} /> Need urgent help?</h2>
        <p className="mt-2 text-sm text-zinc-500">For active leaks or building safety concerns, your front desk is available 24/7.</p>
        <a href="tel:2125550148" className="mt-3 block text-sm font-medium text-indigo-600">Call (212) 555-0148</a>
      </Card>
    </div>
  )
}
