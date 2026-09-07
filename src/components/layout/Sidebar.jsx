// Generic scrollable panel shell used to host each game's controls.
export default function Sidebar({ children, className = '' }) {
  return (
    <aside className={`bg-surface border border-muted/20 rounded-sm p-4 md:p-5 overflow-y-auto flex flex-col gap-5 shadow-xl ${className}`}>
      {children}
    </aside>
  )
}
