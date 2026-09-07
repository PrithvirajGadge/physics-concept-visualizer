import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// Small looping canvas animation per game, drawn with plain 2D canvas calls.
function drawPreview(ctx, w, h, t, kind) {
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = '#090d1a'
  ctx.fillRect(0, 0, w, h)

  if (kind === 'projectile') {
    const groundY = h - 18
    ctx.strokeStyle = 'rgba(61,80,112,0.4)'
    ctx.beginPath()
    ctx.moveTo(0, groundY)
    ctx.lineTo(w, groundY)
    ctx.stroke()
    const progress = (t % 2200) / 2200
    const x = 14 + progress * (w - 28)
    const peak = h * 0.32
    const y = groundY - Math.sin(progress * Math.PI) * (groundY - peak)
    ctx.strokeStyle = 'rgba(255,107,53,0.5)'
    ctx.beginPath()
    for (let p = 0; p <= progress; p += 0.02) {
      const px = 14 + p * (w - 28)
      const py = groundY - Math.sin(p * Math.PI) * (groundY - peak)
      p === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
    }
    ctx.stroke()
    ctx.fillStyle = '#00e5ff'
    ctx.shadowColor = '#00e5ff'
    ctx.shadowBlur = 10
    ctx.beginPath()
    ctx.arc(x, y, 4, 0, Math.PI * 2)
    ctx.fill()
  } else if (kind === 'pulley') {
    const cx = w / 2
    ctx.strokeStyle = 'rgba(61,80,112,0.6)'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(cx - 30, 14)
    ctx.lineTo(cx + 30, 14)
    ctx.stroke()
    ctx.fillStyle = '#00e5ff'
    ctx.beginPath()
    ctx.arc(cx, 24, 7, 0, Math.PI * 2)
    ctx.fill()
    const bob = Math.sin(t / 500) * 8
    ctx.strokeStyle = 'rgba(220,232,255,0.5)'
    ctx.beginPath()
    ctx.moveTo(cx, 24)
    ctx.lineTo(cx, h * 0.62 + bob)
    ctx.stroke()
    ctx.fillStyle = '#ff6b35'
    ctx.fillRect(cx - 12, h * 0.62 + bob, 24, 18)
  } else {
    ctx.strokeStyle = '#00e5ff'
    ctx.lineWidth = 2
    ctx.beginPath()
    for (let x = 0; x <= w; x += 2) {
      const y = h / 2 + Math.sin(x * 0.06 + t / 260) * (h * 0.22)
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.stroke()
    ctx.strokeStyle = 'rgba(127,255,0,0.55)'
    ctx.beginPath()
    for (let x = 0; x <= w; x += 2) {
      const y = h / 2 + Math.sin(x * 0.06 + t / 260 + Math.PI / 2) * (h * 0.14)
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.stroke()
  }
}

export default function LevelCard({ icon, title, description, conceptTag, difficulty, route, previewKind, accentColor = 'var(--accent)' }) {
  const navigate = useNavigate()
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    let raf
    const loop = (t) => {
      drawPreview(ctx, w, h, t, previewKind)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [previewKind])

  return (
    <div
      onClick={() => navigate(route)}
      className="group cursor-pointer bg-surface border border-muted/25 rounded-sm overflow-hidden
        transition-all duration-200 hover:border-accent/60 hover:-translate-y-1"
      style={{ '--card-accent': accentColor }}
    >
      <div className="h-32 border-b border-muted/20">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl">{icon}</span>
          <span
            className="text-[10px] font-orbitron tracking-[0.1em] uppercase px-2 py-1 rounded-sm border"
            style={{ color: accentColor, borderColor: accentColor }}
          >
            {conceptTag}
          </span>
        </div>
        <h3 className="font-orbitron text-lg text-text">{title}</h3>
        <p className="text-sm text-muted leading-relaxed">{description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] font-mono text-muted">{difficulty}</span>
          <span
            className="font-orbitron text-xs tracking-[0.1em] uppercase transition-colors"
            style={{ color: accentColor }}
          >
            Play now →
          </span>
        </div>
      </div>
    </div>
  )
}
