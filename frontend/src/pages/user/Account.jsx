import { useState } from 'react'
import { Card } from '../../components/ui/Card.jsx'
import Button from '../../components/ui/Button.jsx'
import { Field, Input, Select } from '../../components/ui/Field.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const prefs = ['Ticket status updates', 'Visit reminders', 'New messages']

function Toggle({ on, onChange, label }) {
  return (
    <button role="switch" aria-checked={on} aria-label={label} onClick={onChange} className={`h-6 w-11 rounded-full p-0.5 transition-colors ${on ? 'bg-indigo-600' : 'bg-zinc-200'}`}>
      <span className={`block h-5 w-5 rounded-full bg-white transition-transform ${on ? 'translate-x-5' : ''}`} />
    </button>
  )
}

export default function Account() {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)
  const [on, setOn] = useState({ 'Ticket status updates': true, 'Visit reminders': true, 'New messages': false })

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <h2 className="mb-4 font-semibold">Contact details</h2>
        <div className="space-y-4">
          <Field label="Email address"><Input defaultValue={user.email} /></Field>
          <Field label="Phone number"><Input defaultValue="(212) 555-0132" /></Field>
          <Field label="Preferred language"><Select options={['English', 'Español']} /></Field>
        </div>
      </Card>
      <Card>
        <h2 className="mb-1 font-semibold">Notifications</h2>
        <p className="mb-3 text-sm text-zinc-500">Service-critical notices are always sent by email.</p>
        {prefs.map((p) => (
          <div key={p} className="flex items-center justify-between border-t border-zinc-100 py-3 text-sm">
            {p}<Toggle label={p} on={on[p]} onChange={() => setOn({ ...on, [p]: !on[p] })} />
          </div>
        ))}
      </Card>
      <div className="flex items-center gap-3 md:col-span-2">
        <Button onClick={() => setSaved(true)}>Save changes</Button>
        {saved && <span className="text-sm text-emerald-700">Changes saved.</span>}
      </div>
    </div>
  )
}
