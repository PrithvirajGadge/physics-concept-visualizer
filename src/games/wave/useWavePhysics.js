// Wave mechanics math, all in SI-ish units (meters, seconds, Hz, radians).
//
//   y(x, t) = A * sin(2*pi*f*t - (2*pi/lambda)*x + phase)
//
// direction: 1 = traveling in +x (default), -1 = traveling in -x
// (used to build standing waves from two counter-propagating waves).

export function computeWavePoint(x, t, A, f, lambda, phase = 0, direction = 1) {
  const omega = 2 * Math.PI * f
  const k = 2 * Math.PI / lambda
  return A * Math.sin(omega * t - direction * k * x + phase)
}

// Element-wise sum of two point arrays sampled at the same x positions.
export function computeResultant(wave1Points, wave2Points) {
  return wave1Points.map((p, i) => ({
    x: p.x,
    y: p.y + (wave2Points[i] ? wave2Points[i].y : 0),
  }))
}

export function derivedQuantities(f, lambda) {
  const T = f > 0 ? 1 / f : Infinity
  const v = f * lambda
  const k = (2 * Math.PI) / lambda
  const omega = 2 * Math.PI * f
  return { T, v, k, omega }
}

// Classifies phase offset between two identical waves into an interference type.
export function classifyInterference(phase2Deg) {
  const norm = ((phase2Deg % 360) + 360) % 360
  if (norm <= 20 || norm >= 340) return 'CONSTRUCTIVE'
  if (Math.abs(norm - 180) <= 20) return 'DESTRUCTIVE'
  return 'PARTIAL'
}
