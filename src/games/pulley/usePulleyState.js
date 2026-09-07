import { create } from 'zustand'
import { PULLEY_LEVELS } from './PulleyLevels.js'

export const usePulleyState = create((set, get) => ({
  currentLevel: PULLEY_LEVELS[0],
  effortForce: '',
  feedback: null, // { hit, error, tooHigh, tooLow }
  isLifting: false,
  submitted: false,

  selectLevel: (levelId) => {
    const level = PULLEY_LEVELS.find((l) => l.id === levelId) || get().currentLevel
    set({ currentLevel: level, effortForce: '', feedback: null, isLifting: false, submitted: false })
  },

  setEffortForce: (v) => set({ effortForce: v }),
  setFeedback: (feedback) => set({ feedback, submitted: true }),
  setLifting: (v) => set({ isLifting: v }),

  reset: () => set({ effortForce: '', feedback: null, isLifting: false, submitted: false }),
}))
