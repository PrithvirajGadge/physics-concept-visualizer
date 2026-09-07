import { useEffect, useMemo, useRef } from 'react'
import { useCanvasResize } from '../../components/canvas/useCanvasResize.js'
import { clear, drawLine, drawCircle, drawLabel, drawParticles, spawnParticles, stepParticles } from '../../components/canvas/drawUtils.js'
import { simulateTrajectory } from './useProjectilePhysics.js'
import { useProjectileState } from './useProjectileState.js'

const GROUND_MARGIN = 44

export default function ProjectileCanvas() {
  const { canvasRef, width, height } = useCanvasResize()
  const { velocity, angle, gravity, currentLevel, ghostEnabled, isAnimating, startThrow, finishThrow } = useProjectileState()

  const rafRef = useRef(null)
  const animRef = useRef({ points: [], particles: [], startTime: 0, duration: 0, result: null, phase: 'idle' })

  // Scale (px per meter) is calibrated so a reference throw (22 m/s, 45deg)
  // lands roughly at the level's target position — keeps every level legible.
  const scale = useMemo(() => {
    if (!width) return 4
    const ref = simulateTrajectory(22, 45, gravity, currentLevel.launchHeight)
    const targetPx = currentLevel.targetDist * width
    return ref.range > 0 ? targetPx / ref.range : 4
  }, [width, gravity, currentLevel])

  const groundY = height - GROUND_MARGIN
  const worldToPx = (xm, ym) => ({ x: xm * scale, y: groundY - ym * scale })

  // Kick off a fresh throw animation whenever isAnimating flips true.
  useEffect(() => {
    if (!isAnimating || !width) return
    const sim = simulateTrajectory(velocity, angle, gravity, currentLevel.launchHeight)
    const targetPx = currentLevel.targetDist * width
    const landingPx = sim.range * scale
    const hit = Math.abs(landingPx - targetPx) <= currentLevel.radius
    animRef.current = {
      points: sim.points,
      particles: [],
      startTime: performance.now(),
      duration: Math.max(sim.flightTime, 0.4) * 1000,
      result: { hit, range: sim.range, maxHeight: sim.maxHeight, flightTime: sim.flightTime, velocity },
      phase: 'flying',
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimating])

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx || !width || !height) return

    const draw = () => {
      clear(ctx, width, height)
      drawLine(ctx, 0, groundY, width, groundY, 'rgba(61,80,112,0.5)', 2)

      // Building for elevated launches
      if (currentLevel.launchHeight > 0) {
        const top = worldToPx(0, currentLevel.launchHeight)
        ctx.fillStyle = 'rgba(13,19,38,0.9)'
        ctx.strokeStyle = 'rgba(61,80,112,0.6)'
        ctx.fillRect(4, top.y, 26, groundY - top.y)
        ctx.strokeRect(4, top.y, 26, groundY - top.y)
      }

      // Launch character marker
      const launchPx = worldToPx(0, currentLevel.launchHeight)
      drawCircle(ctx, launchPx.x + (currentLevel.launchHeight > 0 ? 17 : 6), launchPx.y - 8, 5, '#dce8ff')

      // Target zone
      const targetPx = worldToPx(currentLevel.targetDist * width / scale, currentLevel.targetY)
      drawCircle(ctx, targetPx.x, targetPx.y - currentLevel.radius / 2, currentLevel.radius, 'rgba(255,51,85,0.18)')
      ctx.save()
      ctx.strokeStyle = '#ff3355'
      ctx.setLineDash([4, 3])
      ctx.beginPath()
      ctx.arc(targetPx.x, targetPx.y, currentLevel.radius, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()
      drawLabel(ctx, 'TARGET', targetPx.x, targetPx.y + currentLevel.radius + 14, { color: '#ff3355', align: 'center' })

      // Ghost preview of current inputs when idle
      if (ghostEnabled && animRef.current.phase !== 'flying') {
        const ghost = simulateTrajectory(velocity, angle, gravity, currentLevel.launchHeight)
        ctx.save()
        ctx.strokeStyle = 'rgba(220,232,255,0.35)'
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ghost.points.forEach((p, i) => {
          if (i % 2 !== 0) return
          const px = worldToPx(p.x, p.y)
          i === 0 ? ctx.moveTo(px.x, px.y) : ctx.lineTo(px.x, px.y)
        })
        ctx.stroke()
        ctx.restore()
      }

      // Persistent faded trail from last completed throw
      if (animRef.current.lastPoints?.length) {
        ctx.save()
        ctx.strokeStyle = 'rgba(255,107,53,0.3)'
        ctx.setLineDash([3, 4])
        ctx.beginPath()
        animRef.current.lastPoints.forEach((p, i) => {
          const px = worldToPx(p.x, p.y)
          i === 0 ? ctx.moveTo(px.x, px.y) : ctx.lineTo(px.x, px.y)
        })
        ctx.stroke()
        ctx.restore()
      }

      const state = animRef.current
      if (state.phase === 'flying') {
        const elapsed = performance.now() - state.startTime
        const progress = Math.min(elapsed / state.duration, 1)
        const idx = Math.floor(progress * (state.points.length - 1))
        const current = state.points[idx] || state.points[state.points.length - 1]

        ctx.save()
        ctx.strokeStyle = '#ff6b35'
        ctx.lineWidth = 2
        ctx.beginPath()
        for (let i = 0; i <= idx; i++) {
          const px = worldToPx(state.points[i].x, state.points[i].y)
          i === 0 ? ctx.moveTo(px.x, px.y) : ctx.lineTo(px.x, px.y)
        }
        ctx.stroke()
        ctx.restore()

        const ballPx = worldToPx(current.x, current.y)
        drawCircle(ctx, ballPx.x, ballPx.y, 6, '#00e5ff', '#00e5ff')

        if (progress >= 1 && state.phase === 'flying') {
          state.phase = 'landed'
          state.lastPoints = state.points
          if (state.result.hit) {
            state.particles = spawnParticles(ballPx.x, ballPx.y, '#00ff88')
          }
          finishThrow(state.points, state.result)
        }
      }

      if (animRef.current.particles.length) {
        drawParticles(ctx, animRef.current.particles)
      }
    }

    const loop = () => {
      if (animRef.current.particles.length) {
        animRef.current.particles = stepParticles(animRef.current.particles, 1 / 30)
      }
      draw()
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [width, height, velocity, angle, gravity, currentLevel, ghostEnabled, groundY, scale])

  return <canvas ref={canvasRef} />
}
