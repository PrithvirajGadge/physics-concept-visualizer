import { create } from 'zustand'
import { WAVE_LEVELS } from './WaveLevels.js'

export const useWaveState = create((set) => ({
  mode: WAVE_LEVELS[0].mode,
  currentPreset: WAVE_LEVELS[0],

  A1: WAVE_LEVELS[0].A,
  f1: WAVE_LEVELS[0].f,
  lambda1: WAVE_LEVELS[0].lambda,

  A2: WAVE_LEVELS[0].A,
  f2: WAVE_LEVELS[0].f,
  lambda2: WAVE_LEVELS[0].lambda,
  phase2: WAVE_LEVELS[0].phase2,

  showWave2: true,
  showResultant: true,
  showNodes: true,
  paused: false,

  selectPreset: (id) => {
    const preset = WAVE_LEVELS.find((p) => p.id === id) || WAVE_LEVELS[0]
    set({
      currentPreset: preset,
      mode: preset.mode,
      A1: preset.A,
      f1: preset.f,
      lambda1: preset.lambda,
      A2: preset.A,
      f2: preset.f,
      lambda2: preset.lambda,
      phase2: preset.phase2,
    })
  },

  setMode: (mode) => set({ mode }),
  setA1: (v) => set({ A1: v }),
  setF1: (v) => set({ f1: v }),
  setLambda1: (v) => set({ lambda1: v }),
  setA2: (v) => set({ A2: v }),
  setF2: (v) => set({ f2: v }),
  setLambda2: (v) => set({ lambda2: v }),
  setPhase2: (v) => set({ phase2: v }),

  toggleShowWave2: () => set((s) => ({ showWave2: !s.showWave2 })),
  toggleShowResultant: () => set((s) => ({ showResultant: !s.showResultant })),
  toggleShowNodes: () => set((s) => ({ showNodes: !s.showNodes })),
  togglePaused: () => set((s) => ({ paused: !s.paused })),
}))
