import { useState } from 'react'
import GameShell from '../components/layout/GameShell.jsx'
import FlashcardOverlay from '../components/ui/FlashcardOverlay.jsx'
import PanelTitle from '../components/ui/PanelTitle.jsx'
import PulleyCanvas from '../games/pulley/PulleyCanvas.jsx'
import PulleySidebar from '../games/pulley/PulleySidebar.jsx'
import { pulleyFlashcard } from '../games/pulley/pulley.flashcard.js'
import { usePulleyState } from '../games/pulley/usePulleyState.js'
import { computeAnswer } from '../games/pulley/usePulleyPhysics.js'

function PulleyInfoPanel() {
  const { currentLevel, submitted } = usePulleyState()
  const { W, F, MA } = computeAnswer(currentLevel.mass, currentLevel.g, currentLevel.n)
  const oneToOneForce = W

  return (
    <div className="bg-surface border border-muted/20 rounded-sm p-5 flex flex-col gap-5 overflow-y-auto">
      <div>
        <PanelTitle accentColor="var(--accent3)">Live formula</PanelTitle>
        <div className="bg-surface2 border border-accent3/30 rounded-sm px-4 py-3 font-mono text-sm">
          <div className="text-muted text-[11px] mb-1">F = W / n</div>
          <div className="text-accent3">
            {W.toFixed(1)} N / {MA} = <span className="text-accent">{F.toFixed(1)} N</span>
          </div>
        </div>
      </div>

      <div>
        <PanelTitle accentColor="var(--accent3)">Comparison</PanelTitle>
        <p className="text-xs text-text/85 leading-relaxed">
          With n=1: you pull <span className="text-accent2 font-mono">{oneToOneForce.toFixed(0)} N</span>. With n=
          {MA}: you pull <span className="text-accent font-mono">{F.toFixed(0)} N</span>.
        </p>
      </div>

      <div>
        <PanelTitle accentColor="var(--accent3)">Energy note</PanelTitle>
        <p className="text-xs text-text/85 leading-relaxed">
          You pull <span className="text-accent font-mono">{MA}×</span> farther — same work done. Pulleys trade force for distance, not free energy.
        </p>
      </div>

      {submitted && (
        <div>
          <PanelTitle accentColor="var(--accent3)">Step-by-step</PanelTitle>
          <div className="font-mono text-[11px] text-muted space-y-1.5">
            <div>1. W = m·g = {currentLevel.mass} × {currentLevel.g} = <span className="text-text">{W.toFixed(1)} N</span></div>
            <div>2. MA = n = <span className="text-text">{MA}</span></div>
            <div>3. F = W / n = {W.toFixed(1)} / {MA} = <span className="text-accent">{F.toFixed(1)} N</span></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function PulleyGame() {
  const [flashcardOpen, setFlashcardOpen] = useState(true)

  return (
    <>
      <GameShell
        title="Pulley Power"
        icon="⚙️"
        accentColor="var(--accent)"
        onViewConcept={() => setFlashcardOpen(true)}
        sidebar={<PulleySidebar />}
        canvas={<PulleyCanvas />}
        rightPanel={<PulleyInfoPanel />}
      />
      <FlashcardOverlay isOpen={flashcardOpen} onClose={() => setFlashcardOpen(false)} content={pulleyFlashcard} />
    </>
  )
}
