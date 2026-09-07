// Shared low-level canvas helpers reused across the three games.

export function clear(ctx, width, height) {
  ctx.clearRect(0, 0, width, height)
}

export function fillBackground(ctx, width, height, color = '#05080f') {
  ctx.fillStyle = color
  ctx.fillRect(0, 0, width, height)
}

export function drawDotGrid(ctx, width, height, spacing = 26, color = 'rgba(220,232,255,0.05)') {
  ctx.save()
  ctx.fillStyle = color
  for (let x = spacing / 2; x < width; x += spacing) {
    for (let y = spacing / 2; y < height; y += spacing) {
      ctx.beginPath()
      ctx.arc(x, y, 1, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  ctx.restore()
}

export function drawCircle(ctx, x, y, radius, fillColor, glowColor) {
  ctx.save()
  if (glowColor) {
    ctx.shadowColor = glowColor
    ctx.shadowBlur = 14
  }
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fillStyle = fillColor
  ctx.fill()
  ctx.restore()
}

export function drawLine(ctx, x1, y1, x2, y2, color, width = 2, dash = []) {
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.setLineDash(dash)
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
  ctx.restore()
}

export function drawArrow(ctx, x1, y1, x2, y2, color, width = 2) {
  const headLen = 9
  const angle = Math.atan2(y2 - y1, x2 - x1)
  ctx.save()
  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.lineWidth = width
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x2, y2)
  ctx.lineTo(x2 - headLen * Math.cos(angle - Math.PI / 6), y2 - headLen * Math.sin(angle - Math.PI / 6))
  ctx.lineTo(x2 - headLen * Math.cos(angle + Math.PI / 6), y2 - headLen * Math.sin(angle + Math.PI / 6))
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

export function drawLabel(ctx, text, x, y, { color = '#dce8ff', font = '12px "Space Mono", monospace', align = 'left' } = {}) {
  ctx.save()
  ctx.fillStyle = color
  ctx.font = font
  ctx.textAlign = align
  ctx.textBaseline = 'middle'
  ctx.fillText(text, x, y)
  ctx.restore()
}

export function drawParticles(ctx, particles) {
  particles.forEach((p) => {
    ctx.save()
    ctx.globalAlpha = Math.max(p.life, 0)
    ctx.fillStyle = p.color
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  })
}

export function spawnParticles(x, y, color = '#00ff88', count = 18) {
  const particles = []
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4
    const speed = 60 + Math.random() * 90
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 2 + Math.random() * 2,
      life: 1,
      color,
    })
  }
  return particles
}

export function stepParticles(particles, dt) {
  return particles
    .map((p) => ({
      ...p,
      x: p.x + p.vx * dt,
      y: p.y + p.vy * dt + 60 * dt * dt,
      life: p.life - dt * 1.1,
    }))
    .filter((p) => p.life > 0)
}
