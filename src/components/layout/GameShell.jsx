import { useNavigate } from 'react-router-dom'
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react'
import Button from '../ui/Button.jsx'

// Consistent header + responsive grid shell for every game page.
// sidebar   -> left controls column (required)
// canvas    -> main canvas/stage column (required)
// rightPanel-> optional third column for live info (pulley/wave)
export default function GameShell({ title, icon, accentColor = 'var(--accent)', onViewConcept, sidebar, canvas, rightPanel }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen md:h-screen md:overflow-hidden flex flex-col">
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 md:px-5 md:py-4 border-b border-muted/20 bg-bg/85 backdrop-blur-xl">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-muted hover:text-text transition-colors">
          <ArrowLeft size={16} />
          <span className="font-orbitron text-[10px] md:text-xs tracking-[0.12em] uppercase">Labs</span>
        </button>
        <div className="flex items-center gap-2">
          <span>{icon}</span>
          <h1 className="font-orbitron text-[11px] md:text-sm tracking-[0.12em] uppercase" style={{ color: accentColor }}>
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
          <div className="w-[72px] md:w-[90px]" />
        )}
      </header>

      <main
        className={`flex-1 grid gap-4 p-4 md:p-5 min-h-0 md:h-[calc(100vh-65px)] md:grid-rows-[minmax(0,1fr)] ${
          rightPanel ? 'md:grid-cols-[260px_1fr_280px]' : 'md:grid-cols-[260px_1fr]'
        }`}
      >
        <div className="min-h-0 max-h-[calc(100vh-92px)]">{sidebar}</div>
        <section className="min-h-[380px] md:min-h-0 bg-surface border border-muted/20 rounded-sm overflow-hidden shadow-2xl flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 border-b border-muted/15 bg-surface2/50 text-[10px] font-orbitron tracking-[0.12em] uppercase text-muted"><span>Simulation viewport</span><span className="flex items-center gap-1" style={{ color: accentColor }}>Live <ChevronRight size={12} /></span></div>
          <div className="flex-1 min-h-0">{canvas}</div>
        </section>
        {rightPanel && <div className="min-h-0 max-h-[calc(100vh-92px)]">{rightPanel}</div>}
      </main>
    </div>
  )
}
