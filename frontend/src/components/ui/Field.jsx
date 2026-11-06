const base = 'w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm placeholder:text-zinc-400'

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
    </label>
  )
}
export const Input = (p) => <input className={`${base} h-10`} {...p} />
export const Textarea = (p) => <textarea className={`${base} min-h-24 py-2`} {...p} />
export const Select = ({ options, ...p }) => (
  <select className={`${base} h-10`} {...p}>
    {options.map((o) => <option key={o}>{o}</option>)}
  </select>
)
