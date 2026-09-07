import { ArrowDown, Atom, FlaskConical, Trophy } from 'lucide-react'
import Header from '../components/layout/Header.jsx'
import LevelCard from '../components/ui/LevelCard.jsx'

const GAMES = [
  {
    icon: '🏀',
    title: 'Projectile Motion',
    description: 'Fire a ball across six worlds, from Earth to Jupiter, and hit the target using nothing but angle and speed.',
    conceptTag: 'Projectile Motion',
    difficulty: 'Beginner – Advanced',
    route: '/projectile',
    previewKind: 'projectile',
    accentColor: 'var(--accent2)',
  },
  {
    icon: '⚙️',
    title: 'Pulley Power',
    description: 'Wire up block-and-tackle systems and work out exactly how much force each configuration saves you.',
    conceptTag: 'Mechanical Advantage',
    difficulty: 'Intermediate',
    route: '/pulley',
    previewKind: 'pulley',
    accentColor: 'var(--accent)',
  },
  {
    icon: '🌊',
    title: 'Wave Lab',
    description: 'Sculpt amplitude, frequency and wavelength, then collide two waves to see interference happen live.',
    conceptTag: 'Wave Mechanics',
    difficulty: 'Intermediate – Advanced',
    route: '/wave',
    previewKind: 'wave',
    accentColor: 'var(--accent3)',
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center px-5 py-12 md:px-8 md:py-20 gap-12 md:gap-16">
        <section className="text-center max-w-3xl flex flex-col items-center gap-5 animate-fade-slide-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 text-[10px] font-orbitron tracking-[0.14em] uppercase text-accent">
            <FlaskConical size={13} /> An interactive physics playground
          </div>
          <h1
            className="font-orbitron text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent leading-tight"
            style={{ backgroundImage: 'linear-gradient(90deg, var(--accent), var(--accent2))' }}
          >
            ⚛ PHYSICS VISUAL LAB
          </h1>
          <p className="text-muted text-sm md:text-base leading-relaxed max-w-xl">
            Build intuition through experiments, not rote formulas. Adjust the variables, watch the outcome, and learn by doing.
          </p>
          <a href="#labs" className="mt-1 inline-flex items-center gap-2 text-xs font-orbitron tracking-[0.12em] uppercase text-text hover:text-accent transition-colors">
            Explore the labs <ArrowDown size={14} />
          </a>
        </section>

        <section className="grid grid-cols-3 gap-2 md:gap-4 w-full max-w-3xl" aria-label="Platform highlights">
          <div className="rounded-sm border border-muted/20 bg-surface/80 px-3 py-3 md:px-5 text-center"><Atom className="mx-auto mb-1 text-accent" size={17} /><strong className="block font-orbitron text-sm text-text">3</strong><span className="text-[9px] md:text-[10px] text-muted uppercase tracking-wider">Labs</span></div>
          <div className="rounded-sm border border-muted/20 bg-surface/80 px-3 py-3 md:px-5 text-center"><FlaskConical className="mx-auto mb-1 text-accent2" size={17} /><strong className="block font-orbitron text-sm text-text">Hands-on</strong><span className="text-[9px] md:text-[10px] text-muted uppercase tracking-wider">Experiments</span></div>
          <div className="rounded-sm border border-muted/20 bg-surface/80 px-3 py-3 md:px-5 text-center"><Trophy className="mx-auto mb-1 text-accent3" size={17} /><strong className="block font-orbitron text-sm text-text">Learn</strong><span className="text-[9px] md:text-[10px] text-muted uppercase tracking-wider">By play</span></div>
        </section>

        <section id="labs" className="w-full max-w-6xl scroll-mt-24">
          <div className="flex items-end justify-between mb-5"><div><p className="text-[10px] font-orbitron tracking-[0.16em] uppercase text-accent">Choose your experiment</p><h2 className="font-orbitron text-xl mt-1">Start a lab</h2></div><span className="hidden sm:block text-xs text-muted">Pick a concept and make it move.</span></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {GAMES.map((game) => <LevelCard key={game.route} {...game} />)}
          </div>
        </section>
      </main>
    </div>
  )
}
