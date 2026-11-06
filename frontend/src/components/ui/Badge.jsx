const tones = {
  rose: 'bg-rose-50 text-rose-600',
  amber: 'bg-amber-50 text-amber-700',
  emerald: 'bg-emerald-50 text-emerald-700',
  indigo: 'bg-indigo-50 text-indigo-600',
  zinc: 'bg-zinc-100 text-zinc-600',
}
const byLabel = {
  Critical: 'rose', High: 'amber', Medium: 'zinc', Low: 'zinc',
  'Awaiting approval': 'amber', Triage: 'amber', Review: 'amber',
  Dispatched: 'indigo', Scheduled: 'indigo', Completed: 'emerald',
  Available: 'emerald', 'On a job': 'indigo', 'Fully booked': 'amber', Onboarding: 'amber',
  Healthy: 'emerald', 'At risk': 'amber', 'Needs review': 'amber',
}

// Always renders a text label so color is never the only signal.
export default function Badge({ children, tone }) {
  const t = tone || byLabel[children] || 'zinc'
  return <span className={`inline-block rounded-md px-2.5 py-1 text-xs font-medium ${tones[t]}`}>{children}</span>
}
