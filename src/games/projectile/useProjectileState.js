import { create } from 'zustand'
import { PROJECTILE_LEVELS } from './ProjectileLevels.js'

export const useProjectileState = create((set, get) => ({
  velocity: 22,
  angle: 45,
  gravity: PROJECTILE_LEVELS[0].gravity,
  currentLevel: PROJECTILE_LEVELS[0],

  isAnimating: false,
  ghostEnabled: true,
  lastTrailPoints: [],
  result: null, // { hit, range, maxHeight, flightTime }

  setVelocity: (v) => set({ velocity: v }),
  setAngle: (a) => set({ angle: a }),

  selectLevel: (levelId) => {
    const level = PROJECTILE_LEVELS.find((l) => l.id === levelId) || get().currentLevel
    set({ currentLevel: level, gravity: level.gravity, isAnimating: false, lastTrailPoints: [], result: null })
  },

  setCustomGravity: (g) => set({ gravity: g }),

  toggleGhost: () => set((state) => ({ ghostEnabled: !state.ghostEnabled })),

  startThrow: () => set({ isAnimating: true, result: null }),

  finishThrow: (trailPoints, result) =>
    set({ isAnimating: false, lastTrailPoints: trailPoints, result }),

  reset: () => set({ isAnimating: false, lastTrailPoints: [], result: null }),
}))
