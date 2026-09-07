export default function StatBox({ label, value, unit, accentColor = 'var(--accent)' }) {
  return (
    <div className="bg-surface2 border border-muted/20 rounded-sm px-3 py-2 flex flex-col gap-0.5">
      <span className="text-[10px] tracking-wide text-muted">{label}</span>
      <span className="font-mono text-lg" style={{ color: accentColor }}>
        {value}
        {unit ? <span className="text-xs text-muted"> {unit}</span> : null}
      </span>
    </div>
  )
}
