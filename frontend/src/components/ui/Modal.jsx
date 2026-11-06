import { X } from 'lucide-react'

export default function Modal({ open, title, onClose, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-zinc-900/40 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="rounded p-1 hover:bg-zinc-100"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  )
}
