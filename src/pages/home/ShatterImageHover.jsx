import { useEffect, useRef } from 'react'

export default function ShatterImageHover({
  src,
  rows = 8,
  cols = 12,
  maxShift = 24,
  className = 'w-full', // no aspect ratio here; squares determine height
  disabledOnReduceMotion = true,
}) {
  const containerRef = useRef(null)
  const tilesRef = useRef([])
  const rafState = useRef({ x: 0, y: 0, raf: 0 })

  const wantsReduceMotion =
    typeof window !== 'undefined' &&
    disabledOnReduceMotion &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const el = containerRef.current
    if (!el || wantsReduceMotion) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      rafState.current.x = (e.clientX - rect.left) / rect.width // 0..1
      rafState.current.y = (e.clientY - rect.top) / rect.height // 0..1
      if (!rafState.current.raf) {
        rafState.current.raf = requestAnimationFrame(applyTransforms)
      }
    }

    const onLeave = () => {
      tilesRef.current.forEach((t) => t && (t.style.transform = 'translate3d(0,0,0)'))
    }

    const applyTransforms = () => {
      const { x: cx, y: cy } = rafState.current
      rafState.current.raf = 0

      tilesRef.current.forEach((tile, idx) => {
        if (!tile) return
        const x = idx % cols
        const y = Math.floor(idx / cols)

        const tx = (x + 0.5) / cols
        const ty = (y + 0.5) / rows

        const dx = tx - cx
        const dy = ty - cy
        const dist = Math.hypot(dx, dy)
        const falloff = Math.max(0, 1 - dist * 1.6)
        const angle = Math.atan2(dy, dx)
        const mag = maxShift * falloff

        const seed = (x * 928371 + y * 1237) % 97
        const jitter = (seed - 48) * 0.02

        const ox = Math.cos(angle) * (mag + jitter)
        const oy = Math.sin(angle) * (mag + jitter)

        tile.style.transform = `translate3d(${ox}px, ${oy}px, 0)`
      })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (rafState.current.raf) cancelAnimationFrame(rafState.current.raf)
    }
  }, [rows, cols, maxShift, wantsReduceMotion])

  const total = rows * cols
  const tiles = Array.from({ length: total })

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          // NOTE: no explicit gridTemplateRows → rows auto-size from tile aspect
        }}
      >
        {tiles.map((_, i) => {
          const x = i % cols
          const y = Math.floor(i / cols)
          const bpX = cols === 1 ? 0 : (x / (cols - 1)) * 100
          const bpY = rows === 1 ? 0 : (y / (rows - 1)) * 100

          return (
            <div
              key={i}
              ref={(el) => (tilesRef.current[i] = el)}
              className="aspect-square [transform:translate3d(0,0,0)] bg-cover bg-no-repeat transition-transform duration-200 ease-[cubic-bezier(.2,.8,.2,1)] will-change-transform"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: `${cols * 100}% ${rows * 100}%`,
                backgroundPosition: `${bpX}% ${bpY}%`,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
