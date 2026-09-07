export default function PanelTitle({ children, accentColor = 'var(--accent)' }) {
  return (
    <h3
      className="font-orbitron text-xs tracking-[0.14em] uppercase pb-2 mb-3 border-b"
      style={{ color: accentColor, borderColor: 'rgba(61,80,112,0.35)' }}
    >
      {children}
    </h3>
  )
}
