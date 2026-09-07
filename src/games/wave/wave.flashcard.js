export const waveFlashcard = {
  title: 'Wave Mechanics',
  badge: 'Concept Brief',
  sections: [
    {
      type: 'text',
      body: 'A wave carries energy through a medium without permanently moving the medium itself — each point oscillates in place while the pattern travels.',
    },
    {
      type: 'list',
      heading: 'Core properties',
      items: [
        'Amplitude (A) — how far each point swings from equilibrium',
        'Frequency (f) — oscillations per second, in Hz',
        'Wavelength (λ) — the distance between two identical points on the wave',
        'Period (T = 1/f) — time for one full oscillation',
        'Speed (v = f·λ) — how fast the pattern itself travels',
      ],
    },
    {
      type: 'formula',
      label: 'Wave equation',
      expression: 'y(x, t) = A · sin(2πf·t − (2π/λ)·x + φ)',
    },
    {
      type: 'list',
      heading: 'Interference types',
      items: [
        'Constructive — waves in phase add together into a larger amplitude',
        'Destructive — waves fully out of phase cancel each other out',
        'Partial — any phase offset in between blends the two effects',
      ],
    },
    {
      type: 'insight',
      body: 'A standing wave forms when two identical waves travel in opposite directions. Fixed points called nodes never move at all, while antinodes oscillate with maximum amplitude.',
    },
  ],
}
