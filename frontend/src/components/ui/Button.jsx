const variants = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
  secondary: 'bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50',
  danger: 'bg-rose-500 text-white hover:bg-rose-600',
  ghost: 'text-zinc-600 hover:bg-zinc-100',
}

export default function Button({ variant = 'primary', className = '', icon: Icon, children, ...props }) {
  return (
    <button
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  )
}
