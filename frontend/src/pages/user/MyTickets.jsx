import { Check, Clock } from 'lucide-react'
import { Card } from '../../components/ui/Card.jsx'
import Badge from '../../components/ui/Badge.jsx'
import { history, steps, tickets } from '../../data/mock.js'

export default function MyTickets() {
  return (
    <div className="space-y-4">
      {tickets.map((t) => (
        <Card key={t.id}>
          <div className="mb-2 flex items-center gap-2 text-xs text-zinc-500"><Badge>{t.status}</Badge>{t.id} · {t.category}</div>
          <h2 className="text-lg font-semibold">{t.title}</h2>
          <p className="mb-3 text-sm text-zinc-500">Submitted {t.submitted}</p>
          {t.visit
            ? <p className="mb-4 rounded-lg bg-indigo-50 p-3 text-sm text-indigo-700">Your visit is scheduled: {t.visit}</p>
            : <p className="mb-4 text-sm text-zinc-500">Your property manager is reviewing the repair.</p>}
          <ol className="space-y-3">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-3 text-sm">
                <span className={`grid h-6 w-6 place-items-center rounded-full ${i < t.step ? 'bg-indigo-600 text-white' : i === t.step ? 'border-2 border-indigo-600 text-indigo-600' : 'border border-zinc-300'}`}>
                  {i < t.step ? <Check size={14} /> : i === t.step ? <Clock size={12} /> : null}
                </span>
                <span className={i > t.step ? 'text-zinc-400' : ''}>{s}</span>
              </li>
            ))}
          </ol>
        </Card>
      ))}
      <Card>
        <h2 className="font-semibold">Unit history</h2>
        <p className="mb-3 text-sm text-zinc-500">A record of the care your home has received.</p>
        {history.map((h) => (
          <div key={h.title} className="flex flex-wrap justify-between gap-2 border-t border-zinc-100 py-3 text-sm">
            <div><p className="font-medium">{h.title}</p><p className="text-xs text-zinc-500">{h.note}</p></div>
            <div className="flex items-center gap-3 text-zinc-500">{h.date} · {h.by} <Badge>Completed</Badge></div>
          </div>
        ))}
      </Card>
    </div>
  )
}
