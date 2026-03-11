import { useEffect, useRef } from 'react'

export default function CursorTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    let mouse = { x: W / 2, y: H / 2 }
    let trail = []
    let animId

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY

      // Add trail point
      trail.push({
        x: e.clientX,
        y: e.clientY,
        alpha: 1,
        size: Math.random() * 4 + 2,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2 - 1,
        color: Math.random() > 0.85 ? '#ff003c' : '#39FF14',
      })

      // Limit trail length
      if (trail.length > 60) trail.shift()
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      trail.forEach((p, i) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.alpha, 0, Math.PI * 2)
        ctx.fillStyle = p.color === '#ff003c'
          ? `rgba(255,0,60,${p.alpha * 0.8})`
          : `rgba(57,255,20,${p.alpha * 0.6})`
        ctx.shadowBlur = 12
        ctx.shadowColor = p.color
        ctx.fill()

        // Connect dots
        if (i > 0) {
          ctx.beginPath()
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y)
          ctx.lineTo(p.x, p.y)
          ctx.strokeStyle = `rgba(57,255,20,${p.alpha * 0.15})`
          ctx.lineWidth = 1
          ctx.stroke()
        }

        p.x += p.vx * 0.3
        p.y += p.vy * 0.3
        p.alpha *= 0.92
        p.size *= 0.97
      })

      trail = trail.filter(p => p.alpha > 0.02)
      animId = requestAnimationFrame(draw)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', resize)
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', inset: 0,
      pointerEvents: 'none',
      zIndex: 9996,
      mixBlendMode: 'screen',
    }} />
  )
}