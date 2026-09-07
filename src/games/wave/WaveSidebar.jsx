import Sidebar from '../../components/layout/Sidebar.jsx'
import PanelTitle from '../../components/ui/PanelTitle.jsx'
import SliderInput from '../../components/ui/SliderInput.jsx'
import Button from '../../components/ui/Button.jsx'
import { WAVE_LEVELS } from './WaveLevels.js'
import { useWaveState } from './useWaveState.js'
import { useProgressStore } from '../../store/useProgressStore.js'
import { useEffect } from 'react'

const MODES = [
  { id: 'single', label: 'Single' },
  { id: 'interference', label: 'Interference' },
  { id: 'standing', label: 'Standing' },
]

export default function WaveSidebar() {
  const {
    mode, setMode, currentPreset, selectPreset,
    A1, f1, lambda1, setA1, setF1, setLambda1,
    A2, f2, lambda2, phase2, setA2, setF2, setLambda2, setPhase2,
    showWave2, showResultant, showNodes, paused,
    toggleShowWave2, toggleShowResultant, toggleShowNodes, togglePaused,
  } = useWaveState()
  const completePreset = useProgressStore((s) => s.completeWavePreset)

  useEffect(() => {
    completePreset(currentPreset.id)
  }, [currentPreset.id, completePreset])

  return (
    <Sidebar>
      <div className="rounded-sm border border-accent3/25 bg-accent3/5 p-3">
        <p className="text-[10px] font-orbitron tracking-[0.14em] uppercase text-accent3">Wave controls</p>
        <p className="mt-1 text-[11px] leading-relaxed text-muted">Shape the signals, then read the resulting pattern in the viewport.</p>
      </div>
      <div>
        <PanelTitle>Quick experiments</PanelTitle>
        <div className="flex flex-col gap-1.5">
          {WAVE_LEVELS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => selectPreset(preset.id)}
              className={`text-left px-3 py-2 rounded-sm border text-xs font-mono transition-colors
                ${currentPreset.id === preset.id ? 'border-accent3 text-accent3 bg-accent3/10' : 'border-muted/25 text-muted hover:text-text'}`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <PanelTitle>Wave type</PanelTitle>
        <div className="flex gap-1 bg-surface2 border border-muted/20 rounded-sm p-1">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`flex-1 py-1.5 rounded-sm text-[11px] font-orbitron tracking-wide uppercase transition-colors
              ${mode === m.id ? 'bg-accent text-bg' : 'text-muted hover:text-text'}`}
          >
            {m.label}
          </button>
        ))}
        </div>
      </div>

      <div>
        <PanelTitle accentColor="var(--accent)">Signal A · cyan</PanelTitle>
        <div className="flex flex-col gap-3">
          <SliderInput label="Amplitude" unit="m" value={A1} min={0.1} max={3} step={0.1} onChange={setA1} />
          <SliderInput label="Frequency" unit="Hz" value={f1} min={0.1} max={5} step={0.1} onChange={setF1} />
          <SliderInput label="Wavelength" unit="m" value={lambda1} min={0.5} max={10} step={0.1} onChange={setLambda1} />
        </div>
      </div>

      {mode !== 'single' && (
        <div>
          <PanelTitle accentColor="var(--accent2)">Signal B · orange</PanelTitle>
          <div className="flex flex-col gap-3">
            <SliderInput label="Amplitude" unit="m" value={A2} min={0.1} max={3} step={0.1} onChange={setA2} />
            <SliderInput label="Frequency" unit="Hz" value={f2} min={0.1} max={5} step={0.1} onChange={setF2} />
            <SliderInput label="Wavelength" unit="m" value={lambda2} min={0.5} max={10} step={0.1} onChange={setLambda2} />
            <SliderInput label="Phase difference" unit="°" value={phase2} min={0} max={360} step={5} onChange={setPhase2} />
          </div>
        </div>
      )}

      <div>
        <PanelTitle>Layers</PanelTitle>
        <div className="flex flex-col gap-2 text-xs font-mono">
          <label className="flex items-center gap-2 text-muted">
            <input type="checkbox" checked={showWave2} onChange={toggleShowWave2} disabled={mode === 'single'} />
            Show signal B
          </label>
          <label className="flex items-center gap-2 text-muted">
            <input type="checkbox" checked={showResultant} onChange={toggleShowResultant} disabled={mode === 'single'} />
            Show combined wave
          </label>
          <label className="flex items-center gap-2 text-muted">
            <input type="checkbox" checked={showNodes} onChange={toggleShowNodes} disabled={mode !== 'standing'} />
            Mark nodes & antinodes
          </label>
        </div>
      </div>

      <Button onClick={togglePaused} variant="secondary" className="w-full">
        {paused ? 'Resume motion' : 'Pause motion'} (space)
      </Button>
    </Sidebar>
  )
}
