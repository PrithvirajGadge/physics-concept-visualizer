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
      <main className="flex-1 flex flex-col items-center px-6 py-16 gap-14">
        <div className="text-center max-w-2xl flex flex-col gap-4">
          <h1
            className="font-orbitron text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(90deg, var(--accent), var(--accent2))' }}
          >
            ⚛ PHYSICS VISUAL LAB
          </h1>
          <p className="text-muted text-sm md:text-base tracking-wide">
            Learn physics by playing · not memorizing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {GAMES.map((game) => (
            <LevelCard key={game.route} {...game} />
          ))}
        </div>
      </main>
    </div>
  )
}
