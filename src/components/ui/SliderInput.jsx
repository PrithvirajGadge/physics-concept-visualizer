export default function SliderInput({ label, unit, value, min, max, step = 0.1, onChange, error }) {
  const handleNumberChange = (e) => {
    const raw = e.target.value
    if (raw === '') return onChange(raw)
    onChange(Number(raw))
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] tracking-wide text-muted">{label}</span>
        <span className="font-mono text-sm text-accent">
          {typeof value === 'number' ? value.toFixed(step < 1 ? 2 : 0) : value}
          {unit ? <span className="text-muted"> {unit}</span> : null}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={typeof value === 'number' ? value : min}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleNumberChange}
        className={`bg-surface2 border rounded-sm px-2 py-1 text-sm font-mono text-text w-full
          ${error ? 'border-fail' : 'border-muted/30'}`}
      />
      {error && <span className="text-[11px] text-fail">{error}</span>}
    </div>
  )
}
