// columns: [{ key, label, render?(row) }]
export default function DataTable({ columns, rows, onRowClick }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs text-zinc-500">
          <tr>{columns.map((c) => <th key={c.key} className="px-4 py-3 font-medium">{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.id ?? i} onClick={() => onRowClick?.(r)} className={`border-t border-zinc-100 ${onRowClick ? 'cursor-pointer hover:bg-slate-50' : ''}`}>
              {columns.map((c) => <td key={c.key} className="px-4 py-3.5">{c.render ? c.render(r) : r[c.key]}</td>)}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={columns.length} className="px-4 py-10 text-center text-zinc-500">No matching work orders. Try a different keyword or clear your filters.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
