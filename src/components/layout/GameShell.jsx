import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen } from 'lucide-react'
import Button from '../ui/Button.jsx'

// Consistent header + responsive grid shell for every game page.
// sidebar   -> left controls column (required)
// canvas    -> main canvas/stage column (required)
// rightPanel-> optional third column for live info (pulley/wave)
export default function GameShell({ title, icon, accentColor = 'var(--accent)', onViewConcept, sidebar, canvas, rightPanel }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-5 py-4 border-b border-muted/20">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-muted hover:text-text transition-colors">
          <ArrowLeft size={16} />
          <span className="font-orbitron text-xs tracking-[0.12em] uppercase">Back</span>
        </button>
        <div className="flex items-center gap-2">
          <span>{icon}</span>
          <h1 className="font-orbitron text-sm tracking-[0.12em] uppercase" style={{ color: accentColor }}>
            {title}
          </h1>
        </div>
        {onViewConcept ? (
          <Button variant="ghost" onClick={onViewConcept} className="!px-3 !py-1.5">
            <span className="flex items-center gap-1.5">
              <BookOpen size={13} /> Concept
            </span>
          </Button>
        ) : (
          <div className="w-[90px]" />
        )}
      </header>

      <main
        className={`flex-1 grid gap-4 p-4 md:p-5 min-h-0 ${
          rightPanel ? 'md:grid-cols-[260px_1fr_280px]' : 'md:grid-cols-[260px_1fr]'
        }`}
      >
        <div className="min-h-0">{sidebar}</div>
        <div className="min-h-[420px] bg-surface border border-muted/20 rounded-sm overflow-hidden">{canvas}</div>
        {rightPanel && <div className="min-h-0">{rightPanel}</div>}
      </main>
    </div>
  )
}
