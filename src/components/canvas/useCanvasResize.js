import { useRef, useState, useEffect } from 'react'

// Observes the canvas's parent container with ResizeObserver and keeps
// canvas.width / canvas.height in sync with its rendered CSS size,
// accounting for devicePixelRatio so drawing stays crisp.
export function useCanvasResize() {
  const canvasRef = useRef(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const applySize = () => {
      const dpr = window.devicePixelRatio || 1
      const cssWidth = parent.offsetWidth
      const cssHeight = parent.offsetHeight
      canvas.width = Math.max(1, Math.round(cssWidth * dpr))
      canvas.height = Math.max(1, Math.round(cssHeight * dpr))
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      setSize({ width: cssWidth, height: cssHeight })
    }

    applySize()
    const observer = new ResizeObserver(applySize)
    observer.observe(parent)
    return () => observer.disconnect()
  }, [])

  return { canvasRef, width: size.width, height: size.height }
}
