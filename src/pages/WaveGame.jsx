import { useState } from 'react'
import GameShell from '../components/layout/GameShell.jsx'
import FlashcardOverlay from '../components/ui/FlashcardOverlay.jsx'
import PanelTitle from '../components/ui/PanelTitle.jsx'
import StatBox from '../components/ui/StatBox.jsx'
import WaveCanvas from '../games/wave/WaveCanvas.jsx'
import WaveSidebar from '../games/wave/WaveSidebar.jsx'
import { waveFlashcard } from '../games/wave/wave.flashcard.js'
import { useWaveState } from '../games/wave/useWaveState.js'
import { derivedQuantities, classifyInterference } from '../games/wave/useWavePhysics.js'

const INTERFERENCE_COLOR = {
  CONSTRUCTIVE: 'var(--success)',
  DESTRUCTIVE: 'var(--fail)',
  PARTIAL: 'var(--accent2)',
}

function WaveInfoPanel() {
  const { mode, f1, lambda1, phase2 } = useWaveState()
  const { T, v, k, omega } = derivedQuantities(f1, lambda1)
  const interference = classifyInterference(phase2)

  return (
    <div className="h-full bg-surface border border-muted/20 rounded-sm p-5 flex flex-col gap-4 overflow-y-auto">
      <div className="rounded-sm border border-accent3/25 bg-accent3/5 px-3 py-2.5">
        <span className="text-[10px] font-orbitron tracking-[0.14em] uppercase text-accent3">Wave monitor</span>
        <p className="mt-1 text-xs text-text/90">{mode === 'single' ? 'One travelling wave' : mode === 'standing' ? 'Opposing waves form a standing pattern' : 'Two waves are superposing'}</p>
      </div>
      <PanelTitle accentColor="var(--accent3)">Calculated live</PanelTitle>
      <div className="grid grid-cols-2 gap-2">
        <StatBox label="Wave speed v = f·λ" value={v.toFixed(2)} unit="m/s" />
        <StatBox label="Period T = 1/f" value={T.toFixed(2)} unit="s" />
        <StatBox label="Wave number k = 2π/λ" value={k.toFixed(2)} unit="rad/m" />
        <StatBox label="Angular freq ω = 2πf" value={omega.toFixed(2)} unit="rad/s" />
      </div>
      {mode !== 'single' && (
        <div>
          <span className="text-[11px] tracking-wide text-muted">Interference</span>
          <div
            className="mt-2 text-center font-orbitron text-sm tracking-[0.1em] uppercase py-2 rounded-sm border"
            style={{ color: INTERFERENCE_COLOR[interference], borderColor: INTERFERENCE_COLOR[interference] }}
          >
            {interference}
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-muted">Phase offset: <span className="text-text">{phase2.toFixed(0)}°</span>. Adjust it to watch the resultant change in real time.</p>
        </div>
      )}
    </div>
  )
}

export default function WaveGame() {
  const [flashcardOpen, setFlashcardOpen] = useState(true)

  return (
    <>
      <GameShell
        title="Wave Lab"
        icon="🌊"
        accentColor="var(--accent3)"
        onViewConcept={() => setFlashcardOpen(true)}
        sidebar={<WaveSidebar />}
        canvas={<WaveCanvas />}
        rightPanel={<WaveInfoPanel />}
      />
      <FlashcardOverlay isOpen={flashcardOpen} onClose={() => setFlashcardOpen(false)} content={waveFlashcard} />
    </>
  )
}
