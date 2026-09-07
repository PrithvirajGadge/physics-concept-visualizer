import { useEffect, useRef } from 'react'
import { useCanvasResize } from '../../components/canvas/useCanvasResize.js'
import { clear, drawCircle, drawLine, drawArrow, drawLabel } from '../../components/canvas/drawUtils.js'
import { usePulleyState } from './usePulleyState.js'
import { computeAnswer } from './usePulleyPhysics.js'

const BEAM_Y = 46
const PULLEY_R = 12

export default function PulleyCanvas() {
  const { canvasRef, width, height } = useCanvasResize()
  const { currentLevel, effortForce, isLifting, setLifting } = usePulleyState()
  const rafRef = useRef(null)
  const liftRef = useRef({ start: 0, active: false, offset: 0 })

  useEffect(() => {
    if (!isLifting) return
    liftRef.current = { start: performance.now(), active: true, offset: 0 }
    const timeout = setTimeout(() => {
      liftRef.current.active = false
      setLifting(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [isLifting, setLifting])

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx || !width || !height) return

    const { n, mass, g } = currentLevel
    const { W, F } = computeAnswer(mass, g, n)

    const draw = () => {
      clear(ctx, width, height)

      // Ceiling beam
      drawLine(ctx, 20, BEAM_Y, width - 20, BEAM_Y, '#3d5070', 6)

      const centerX = width / 2
      const spread = Math.min(width * 0.32, 140)
      const segCount = n
      const anchorXs = Array.from({ length: segCount }, (_, i) =>
        segCount === 1 ? centerX : centerX - spread / 2 + (spread * i) / (segCount - 1),
      )

      let liftOffset = 0
      if (liftRef.current.active) {
        const t = Math.min((performance.now() - liftRef.current.start) / 2000, 1)
        liftOffset = 60 * (1 - Math.pow(1 - t, 3))
      }

      const movableY = Math.min(height - 70, BEAM_Y + 150) - liftOffset
      const loadY = movableY + 26

      // Rope segments from beam to movable pulley / hook
      anchorXs.forEach((x) => {
        drawCircle(ctx, x, BEAM_Y + 2, PULLEY_R - 3, '#0d1326')
        ctx.save()
        ctx.strokeStyle = '#3d5070'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(x, BEAM_Y + 2, PULLEY_R - 3, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
        drawLine(ctx, x, BEAM_Y + 2, centerX, movableY, '#dce8ff', 1.5)
      })

      // Movable pulley (only meaningful visually when n > 1)
      if (n > 1) {
        drawCircle(ctx, centerX, movableY, PULLEY_R, '#090d1a')
        ctx.save()
        ctx.strokeStyle = '#00e5ff'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(centerX, movableY, PULLEY_R, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }

      // Load
      drawLine(ctx, centerX, movableY, centerX, loadY, '#dce8ff', 1.5)
      ctx.save()
      ctx.fillStyle = '#ff6b35'
      ctx.shadowColor = '#ff6b35'
      ctx.shadowBlur = 8
      ctx.fillRect(centerX - 22, loadY, 44, 32)
      ctx.restore()
      drawLabel(ctx, `${mass} kg`, centerX, loadY + 16, { color: '#05080f', align: 'center', font: 'bold 11px "Space Mono", monospace' })

      // A force map makes the direction and magnitude trade-off visible at a glance.
      const forceArrowY = loadY + 16
      drawArrow(ctx, centerX - 42, forceArrowY - 4, centerX - 42, forceArrowY + 48, '#ff6b35', 2)
      drawLabel(ctx, `weight ${W.toFixed(0)} N`, centerX - 50, forceArrowY + 60, { color: '#ff6b35', align: 'center', font: '10px "Space Mono", monospace' })
      const liftForce = n * F
      drawArrow(ctx, centerX + 42, forceArrowY + 48, centerX + 42, forceArrowY - 4, '#00e5ff', 2)
      drawLabel(ctx, `lift ${liftForce.toFixed(0)} N`, centerX + 50, forceArrowY + 60, { color: '#00e5ff', align: 'center', font: '10px "Space Mono", monospace' })

      // Small upward arrows show the tension contributed by each supporting rope segment.
      const tensionY = movableY + 12
      anchorXs.forEach((x) => {
        const arrowX = x + (centerX - x) * 0.72
        drawArrow(ctx, arrowX, tensionY + 18, arrowX, tensionY + 3, 'rgba(127,255,0,0.85)', 1.5)
      })
      drawLabel(ctx, `${n} × ${F.toFixed(0)} N tension`, centerX, movableY - 25, { color: '#7fff00', align: 'center', font: '10px "Space Mono", monospace' })

      // Effort rope, exiting from the last anchor down to a hand/effort marker
      const effortX = anchorXs[anchorXs.length - 1]
      const handY = height - 30
      drawArrow(ctx, effortX, BEAM_Y + 2, effortX, handY, '#7fff00', 2)
      drawLabel(ctx, `pull ↓  F = ${F.toFixed(0)} N`, effortX + 10, (BEAM_Y + handY) / 2, { color: '#7fff00', align: 'left' })
      if (effortForce !== '' && !Number.isNaN(Number(effortForce))) {
        drawLabel(ctx, `You: ${Number(effortForce).toFixed(0)} N`, effortX + 10, handY - 12, { color: '#dce8ff', align: 'left' })
      }

      // Labels
      drawLabel(ctx, `MA = n = ${n}`, 24, height - 40, { color: '#00e5ff', align: 'left' })
      drawLabel(ctx, `force saved: ${(W - F).toFixed(0)} N`, 24, height - 22, { color: '#ff6b35', align: 'left' })
    }

    const loop = () => {
      draw()
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [width, height, currentLevel, effortForce])

  return <canvas ref={canvasRef} />
}
