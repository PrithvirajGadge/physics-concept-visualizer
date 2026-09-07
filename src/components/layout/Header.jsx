import { Atom, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4 md:px-8 border-b border-muted/20 bg-bg/80 backdrop-blur-xl">
      <button onClick={() => navigate('/')} className="flex items-center gap-2.5 group" aria-label="Go to Physics Visual Lab home">
        <span className="grid h-8 w-8 place-items-center rounded-sm border border-accent/40 bg-accent/10 text-accent group-hover:shadow-glow transition-shadow"><Atom size={17} /></span>
        <span className="font-orbitron text-[11px] md:text-sm tracking-[0.12em] text-text group-hover:text-accent transition-colors">
          PHYSICS VISUAL LAB
        </span>
      </button>
      <div className="hidden sm:flex items-center gap-2 text-[10px] font-orbitron tracking-[0.12em] uppercase text-muted"><Sparkles size={13} className="text-accent3" /> Interactive science, made visual</div>
    </header>
  )
}
