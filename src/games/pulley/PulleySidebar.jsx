import { useEffect } from 'react'
import Sidebar from '../../components/layout/Sidebar.jsx'
import PanelTitle from '../../components/ui/PanelTitle.jsx'
import StatBox from '../../components/ui/StatBox.jsx'
import Button from '../../components/ui/Button.jsx'
import { PULLEY_LEVELS } from './PulleyLevels.js'
import { usePulleyState } from './usePulleyState.js'
import { computeAnswer, checkAnswer } from './usePulleyPhysics.js'
import { useProgressStore } from '../../store/useProgressStore.js'

export default function PulleySidebar() {
  const { currentLevel, effortForce, setEffortForce, feedback, setFeedback, selectLevel, reset, setLifting } = usePulleyState()
  const incrementAttempts = useProgressStore((s) => s.incrementPulleyAttempts)
  const completeLevel = useProgressStore((s) => s.completePulleyLevel)

  const { W, F, MA } = computeAnswer(currentLevel.mass, currentLevel.g, currentLevel.n)

  const handleCheck = () => {
    if (effortForce === '' || Number.isNaN(Number(effortForce))) return
    incrementAttempts()
    const result = checkAnswer(Number(effortForce), F)
    setFeedback(result)
    if (result.hit) {
      completeLevel(currentLevel.id)
      setLifting(true)
    }
  }

  return (
    <Sidebar>
      <div>
        <PanelTitle>Systems</PanelTitle>
        <div className="flex flex-col gap-1.5">
          {PULLEY_LEVELS.map((level) => (
            <button
              key={level.id}
              onClick={() => selectLevel(level.id)}
              className={`flex items-center justify-between px-3 py-2 rounded-sm border text-xs font-mono transition-colors
                ${currentLevel.id === level.id ? 'border-accent text-accent bg-accent/10' : 'border-muted/25 text-muted hover:text-text'}`}
            >
              <span>{level.name}</span>
              <span>n={level.n}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-surface2 border border-muted/20 rounded-sm p-3">
        <p className="text-[11px] text-muted leading-relaxed">{currentLevel.objective}</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <StatBox label="Load mass" value={currentLevel.mass} unit="kg" />
        <StatBox label="Weight" value={W.toFixed(1)} unit="N" accentColor="var(--accent2)" />
      </div>
      <StatBox label="Rope segments" value={currentLevel.n} unit="segments" />

      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] tracking-wide text-muted">Effort force</span>
        <input
          type="number"
          value={effortForce}
          onChange={(e) => setEffortForce(e.target.value)}
          placeholder="Enter Newtons"
          className="bg-surface2 border border-muted/30 rounded-sm px-2 py-2 text-sm font-mono text-text w-full"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleCheck} className="flex-1">Check</Button>
        <Button onClick={reset} variant="secondary">Reset</Button>
      </div>

      {feedback && (
        <div
          className={`rounded-sm border p-3 text-xs font-mono ${
            feedback.hit ? 'border-success text-success' : 'border-fail text-fail'
          }`}
        >
          {feedback.hit
            ? `Correct! ${currentLevel.successFact}`
            : feedback.tooHigh
              ? `Too high. ${currentLevel.failFact}`
              : `Too low. ${currentLevel.failFact}`}
        </div>
      )}
    </Sidebar>
  )
}
