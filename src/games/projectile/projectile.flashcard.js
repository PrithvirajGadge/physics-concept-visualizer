export const projectileFlashcard = {
  title: 'Projectile Motion',
  badge: 'Concept Brief',
  sections: [
    {
      type: 'text',
      body: 'A launched object moves through two completely independent motions at once: constant-velocity horizontal motion, and constant-acceleration vertical motion under gravity.',
    },
    {
      type: 'list',
      heading: 'Two independent motions',
      items: [
        'Horizontal: no forces act sideways, so speed stays constant — x(t) = vx · t',
        'Vertical: gravity constantly decelerates then accelerates the ball — y(t) = h₀ + vy·t − ½g·t²',
      ],
    },
    {
      type: 'formula',
      label: 'Velocity components',
      expression: 'vx = v·cos(θ)   vy = v·sin(θ)',
    },
    {
      type: 'text',
      body: 'Combined, these two motions trace a parabola. Changing the launch angle reshapes that parabola: low angles are flat and long, high angles are tall and short.',
    },
    {
      type: 'list',
      heading: 'What you control',
      items: [
        'Launch velocity (v) — overall speed of the throw',
        'Launch angle (θ) — direction relative to the ground',
        'Gravity (g) — set by the world you\'re playing on',
      ],
    },
    {
      type: 'insight',
      body: 'On flat ground with no launch height, 45° gives the maximum possible range for any given speed — it perfectly balances flight time against horizontal speed.',
    },
  ],
}
