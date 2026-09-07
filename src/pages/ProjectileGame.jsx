import { useState } from 'react'
import GameShell from '../components/layout/GameShell.jsx'
import FlashcardOverlay from '../components/ui/FlashcardOverlay.jsx'
import ProjectileCanvas from '../games/projectile/ProjectileCanvas.jsx'
import ProjectileSidebar from '../games/projectile/ProjectileSidebar.jsx'
import { projectileFlashcard } from '../games/projectile/projectile.flashcard.js'

export default function ProjectileGame() {
  const [flashcardOpen, setFlashcardOpen] = useState(true)

  return (
    <>
      <GameShell
        title="Projectile Motion"
        icon="🏀"
        accentColor="var(--accent2)"
        onViewConcept={() => setFlashcardOpen(true)}
        sidebar={<ProjectileSidebar />}
        canvas={<ProjectileCanvas />}
      />
      <FlashcardOverlay isOpen={flashcardOpen} onClose={() => setFlashcardOpen(false)} content={projectileFlashcard} />
    </>
  )
}
