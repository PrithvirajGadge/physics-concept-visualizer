import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-muted/20">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 group">
        <span className="text-xl">⚛</span>
        <span className="font-orbitron text-sm tracking-[0.14em] text-text group-hover:text-accent transition-colors">
          PHYSICS VISUAL LAB
        </span>
      </button>
    </header>
  )
}
