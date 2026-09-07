import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useProgressStore = create(
  persist(
    (set, get) => ({
      projectile: { completedLevels: [], attempts: 0 },
      pulley: { completedLevels: [], attempts: 0 },
      wave: { completedPresets: [] },

      completeProjectileLevel: (levelId) =>
        set((state) => ({
          projectile: {
            ...state.projectile,
            completedLevels: state.projectile.completedLevels.includes(levelId)
              ? state.projectile.completedLevels
              : [...state.projectile.completedLevels, levelId],
          },
        })),

      incrementProjectileAttempts: () =>
        set((state) => ({ projectile: { ...state.projectile, attempts: state.projectile.attempts + 1 } })),

      completePulleyLevel: (levelId) =>
        set((state) => ({
          pulley: {
            ...state.pulley,
            completedLevels: state.pulley.completedLevels.includes(levelId)
              ? state.pulley.completedLevels
              : [...state.pulley.completedLevels, levelId],
          },
        })),

      incrementPulleyAttempts: () =>
        set((state) => ({ pulley: { ...state.pulley, attempts: state.pulley.attempts + 1 } })),

      completeWavePreset: (presetId) =>
        set((state) => ({
          wave: {
            completedPresets: state.wave.completedPresets.includes(presetId)
              ? state.wave.completedPresets
              : [...state.wave.completedPresets, presetId],
          },
        })),

      resetProgress: () =>
        set({
          projectile: { completedLevels: [], attempts: 0 },
          pulley: { completedLevels: [], attempts: 0 },
          wave: { completedPresets: [] },
        }),
    }),
    { name: 'physics-visual-lab-progress' },
  ),
)
