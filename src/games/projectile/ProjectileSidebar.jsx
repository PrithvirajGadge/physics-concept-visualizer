import { useEffect } from 'react'
import Sidebar from '../../components/layout/Sidebar.jsx'
import PanelTitle from '../../components/ui/PanelTitle.jsx'
import SliderInput from '../../components/ui/SliderInput.jsx'
import StatBox from '../../components/ui/StatBox.jsx'
import Button from '../../components/ui/Button.jsx'
import { PROJECTILE_LEVELS } from './ProjectileLevels.js'
import { useProjectileState } from './useProjectileState.js'
import { useProgressStore } from '../../store/useProgressStore.js'

export default function ProjectileSidebar() {
  const {
    velocity, angle, gravity, currentLevel,
    setVelocity, setAngle, selectLevel, setCustomGravity,
    ghostEnabled, toggleGhost, isAnimating, startThrow, reset, result,
  } = useProjectileState()
  const incrementAttempts = useProgressStore((s) => s.incrementProjectileAttempts)
  const completeLevel = useProgressStore((s) => s.completeProjectileLevel)

  const velocityError = velocity < 1 || velocity > 100 ? 'Keep speed between 1 and 100 m/s' : null
  const angleError = angle < 0 || angle > 90 ? 'Angle must be between 0° and 90°' : null

  const vx = velocity * Math.cos((angle * Math.PI) / 180)
  const vy = velocity * Math.sin((angle * Math.PI) / 180)
  const estRange = (2 * vx * vy) / gravity
  const estPeak = (vy * vy) / (2 * gravity)

  const handleShoot = () => {
    if (velocityError || angleError || isAnimating) return
    incrementAttempts()
    startThrow()
  }

  useEffect(() => {
    if (result?.hit) completeLevel(currentLevel.id)
  }, [result, currentLevel.id, completeLevel])

  return (
    <Sidebar>
      <div>
        <PanelTitle>Worlds</PanelTitle>
        <div className="grid grid-cols-3 gap-2">
          {PROJECTILE_LEVELS.map((level) => (
            <button
              key={level.id}
              onClick={() => selectLevel(level.id)}
              className={`flex flex-col items-center gap-1 py-2 rounded-sm border text-[10px] font-mono transition-colors
                ${currentLevel.id === level.id ? 'border-accent2 text-accent2 bg-accent2/10' : 'border-muted/25 text-muted hover:text-text'}`}
            >
              <span className="text-base">{level.icon}</span>
              {level.name}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-surface2 border border-muted/20 rounded-sm p-3">
        <p className="text-[11px] text-muted leading-relaxed">{currentLevel.objective}</p>
      </div>

      {currentLevel.customGravity && (
        <SliderInput label="Gravity (custom)" unit="m/s²" value={gravity} min={0.5} max={30} step={0.1} onChange={setCustomGravity} />
      )}
      {!currentLevel.customGravity && <StatBox label="Gravity" value={gravity.toFixed(2)} unit="m/s²" accentColor="var(--accent2)" />}

      <SliderInput label="Launch velocity" unit="m/s" value={velocity} min={1} max={100} step={1} onChange={setVelocity} error={velocityError} />
      <SliderInput label="Launch angle" unit="°" value={angle} min={0} max={90} step={1} onChange={setAngle} error={angleError} />

      <button
        onClick={toggleGhost}
        className={`flex items-center justify-between px-3 py-2 rounded-sm border text-xs font-orbitron tracking-wide uppercase transition-colors
          ${ghostEnabled ? 'border-accent text-accent shadow-glow' : 'border-muted/30 text-muted'}`}
      >
        Ghost trajectory
        <span className={`w-8 h-4 rounded-full relative transition-colors ${ghostEnabled ? 'bg-accent' : 'bg-muted/40'}`}>
          <span
            className={`absolute top-0.5 w-3 h-3 rounded-full bg-bg transition-all ${ghostEnabled ? 'left-4' : 'left-0.5'}`}
          />
        </span>
      </button>

      <div className="bg-surface2 border border-muted/20 rounded-sm p-3 font-mono text-[11px] text-muted space-y-1">
        <div>vx = v·cos(θ) = <span className="text-accent">{vx.toFixed(1)} m/s</span></div>
        <div>vy = v·sin(θ) = <span className="text-accent">{vy.toFixed(1)} m/s</span></div>
        <div>Est. range ≈ <span className="text-accent2">{estRange > 0 ? estRange.toFixed(1) : '—'} m</span></div>
        <div>Est. peak ≈ <span className="text-accent2">{estPeak.toFixed(1)} m</span></div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleShoot} disabled={isAnimating || velocityError || angleError} className="flex-1">
          Shoot
        </Button>
        <Button onClick={reset} variant="secondary">
          Reset
        </Button>
      </div>

      {result && (
        <div className={`rounded-sm border p-3 text-xs font-mono ${result.hit ? 'border-success text-success' : 'border-fail text-fail'}`}>
          {result.hit ? 'Target hit! ' + currentLevel.successFact : 'Missed. ' + currentLevel.failFact}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <StatBox label="Range" value={result ? result.range.toFixed(1) : '—'} unit="m" />
        <StatBox label="Max height" value={result ? result.maxHeight.toFixed(1) : '—'} unit="m" />
        <StatBox label="Flight time" value={result ? result.flightTime.toFixed(2) : '—'} unit="s" />
        <StatBox label="Init. vel." value={velocity.toFixed(0)} unit="m/s" />
      </div>
    </Sidebar>
  )
}
