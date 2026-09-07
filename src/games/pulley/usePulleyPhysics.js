// Pulley / mechanical-advantage math.
//
//   W  = mass * g            (weight of the load, in Newtons)
//   MA = n                   (mechanical advantage = number of supporting rope segments)
//   F  = W / n                (effort force required at the pull rope)

export function computeAnswer(mass, g, n) {
  const W = mass * g
  const MA = n
  const F = W / n
  return { W, F, MA }
}

// Compares the user's guessed force against the correct value within a tolerance (N).
export function checkAnswer(userForce, correctF, tolerance = 5) {
  const error = userForce - correctF
  const hit = Math.abs(error) <= tolerance
  return {
    hit,
    error,
    tooHigh: error > tolerance,
    tooLow: error < -tolerance,
  }
}
