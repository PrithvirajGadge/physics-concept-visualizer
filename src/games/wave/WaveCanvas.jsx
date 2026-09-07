import { useEffect, useRef } from 'react'
import { useCanvasResize } from '../../components/canvas/useCanvasResize.js'
import { clear, drawLine, drawCircle, drawLabel } from '../../components/canvas/drawUtils.js'
import { useAnimationFrame } from '../../hooks/useAnimationFrame.js'
import { useWaveState } from './useWaveState.js'
import { computeWavePoint } from './useWavePhysics.js'

const PX_PER_METER = 34

export default function WaveCanvas() {
  const { canvasRef, width, height } = useCanvasResize()
  const { mode, A1, f1, lambda1, A2, f2, lambda2, phase2, showWave2, showResultant, showNodes, paused, togglePaused } =
    useWaveState()
  const timeRef = useRef(0)

  const { start, pause, resume } = useAnimationFrame((dt) => {
    timeRef.current += dt
  })

  useEffect(() => {
    start()
    return () => pause()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (paused) pause()
    else resume()
  }, [paused, pause, resume])

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        togglePaused()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [togglePaused])

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx || !width || !height) return
    const midY = height / 2

    const render = () => {
      clear(ctx, width, height)

      // Equilibrium + amplitude guides
      drawLine(ctx, 0, midY, width, midY, 'rgba(61,80,112,0.4)', 1)
      const maxAmp = Math.max(A1, mode === 'single' ? A1 : A2) * PX_PER_METER
      drawLine(ctx, 0, midY - maxAmp, width, midY - maxAmp, 'rgba(61,80,112,0.18)', 1)
      drawLine(ctx, 0, midY + maxAmp, width, midY + maxAmp, 'rgba(61,80,112,0.18)', 1)

      // Wavelength markers along x-axis
      const lambdaPx = lambda1 * PX_PER_METER
      ctx.save()
      ctx.strokeStyle = 'rgba(61,80,112,0.25)'
      for (let x = 0; x < width; x += lambdaPx) {
        drawLine(ctx, x, midY - maxAmp - 10, x, midY + maxAmp + 10, 'rgba(61,80,112,0.25)', 1)
      }
      ctx.restore()
      drawLabel(ctx, 'y (m)', 8, 14, { color: '#3d5070' })

      const t = timeRef.current
      const step = 2
      const wave1Pts = []
      const wave2Pts = []

      for (let px = 0; px <= width; px += step) {
        const xMeters = px / PX_PER_METER
        const y1 = computeWavePoint(xMeters, t, A1, f1, lambda1, 0, 1)
        wave1Pts.push({ x: px, y: y1 })
        if (mode !== 'single') {
          const direction = mode === 'standing' ? -1 : 1
          const y2 = computeWavePoint(xMeters, t, A2, f2, lambda2, (phase2 * Math.PI) / 180, direction)
          wave2Pts.push({ x: px, y: y2 })
        }
      }

      const drawSeries = (points, color, width2 = 2.5) => {
        ctx.save()
        ctx.strokeStyle = color
        ctx.lineWidth = width2
        ctx.shadowColor = color
        ctx.shadowBlur = 6
        ctx.beginPath()
        points.forEach((p, i) => {
          const py = midY - p.y * PX_PER_METER
          i === 0 ? ctx.moveTo(p.x, py) : ctx.lineTo(p.x, py)
        })
        ctx.stroke()
        ctx.restore()
      }

      drawSeries(wave1Pts, '#00e5ff')

      if (mode !== 'single' && showWave2) {
        drawSeries(wave2Pts, '#ff6b35')
      }

      if (mode !== 'single' && showResultant) {
        const resultant = wave1Pts.map((p, i) => ({ x: p.x, y: p.y + (wave2Pts[i] ? wave2Pts[i].y : 0) }))
        drawSeries(resultant, '#7fff00', 2)

        if (mode === 'standing' && showNodes) {
          // Nodes occur every half wavelength; antinodes fall between them.
          const halfLambdaPx = (lambda1 * PX_PER_METER) / 2
          for (let x = 0; x <= width; x += halfLambdaPx) {
            drawCircle(ctx, x, midY, 4, 'rgba(220,232,255,0.5)')
          }
          for (let x = halfLambdaPx / 2; x <= width; x += halfLambdaPx) {
            drawCircle(ctx, x, midY, 3, 'rgba(127,255,0,0.6)', '#7fff00')
          }
        }
      }
    }

    let raf
    const loop = () => {
      render()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [width, height, mode, A1, f1, lambda1, A2, f2, lambda2, phase2, showWave2, showResultant, showNodes])

  return <canvas ref={canvasRef} />
}
