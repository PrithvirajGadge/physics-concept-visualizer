const VARIANTS = {
  primary: 'bg-accent text-bg border-accent hover:shadow-glow',
  secondary: 'bg-transparent text-accent border-accent/60 hover:bg-accent/10',
  danger: 'bg-transparent text-fail border-fail/60 hover:bg-fail/10',
  ghost: 'bg-transparent text-muted border-muted/40 hover:text-text hover:border-text/40',
}

export default function Button({ children, onClick, variant = 'primary', disabled = false, type = 'button', className = '', title }) {
  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2.5 border rounded-sm font-orbitron text-xs tracking-[0.12em] uppercase
        transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed
        disabled:shadow-none ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
