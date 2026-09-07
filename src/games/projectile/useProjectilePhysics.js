// All projectile-motion math lives here, decoupled from rendering.
//
// Kinematics used (SI units throughout — meters, seconds, m/s, m/s²):
//   vx = v * cos(theta)
//   vy = v * sin(theta)
//   x(t)  = vx * t
//   y(t)  = h0 + vy * t - 0.5 * g * t^2
//
// The trajectory is stepped forward in fixed dt increments until y < 0,
// then the exact landing point is found analytically so the endpoint is precise.

const DT = 0.03

export function simulateTrajectory(velocity, angleDeg, gravity, launchHeight = 0) {
  const theta = (angleDeg * Math.PI) / 180
  const vx = velocity * Math.cos(theta)
  const vy0 = velocity * Math.sin(theta)

  const points = []
  let t = 0
  let maxHeight = launchHeight

  // Step until the ball would go below ground, then stop.
  while (true) {
    const y = launchHeight + vy0 * t - 0.5 * gravity * t * t
    if (y < 0) break
    const x = vx * t
    points.push({ x, y, t })
    if (y > maxHeight) maxHeight = y
    t += DT
  }

  // Solve h0 + vy0*t - 0.5*g*t^2 = 0 for the exact landing time (quadratic formula).
  const a = -0.5 * gravity
  const b = vy0
  const c = launchHeight
  const disc = b * b - 4 * a * c
  const flightTime = disc >= 0 ? (-b - Math.sqrt(disc)) / (2 * a) : t

  const range = vx * flightTime
  points.push({ x: range, y: 0, t: flightTime })

  return { points, maxHeight, flightTime, range, vx, vy: vy0 }
}
