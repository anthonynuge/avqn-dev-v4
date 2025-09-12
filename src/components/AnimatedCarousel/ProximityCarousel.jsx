import React, { useCallback, useEffect, useRef, useState } from 'react'
import ProximityGlass from './ProximityGlass'

/**
 * ProximityGlassCarousel
 * Minimal, reliable carousel that remounts ProximityGlass on src change
 * so your entry reveal runs every slide.
 */
export default function ProximityGlassCarousel({
  images = [],
  slices = 20,
  height = '30dvh',
  interval = 5000, // autoplay ms (set to 0/false to disable)
  transitionMs = 220, // quick fade for the whole slide
  pauseOnHover = true,
  showArrows = true,
  showDots = true,
  className = '',
}) {
  const [index, setIndex] = useState(0)
  const [isPaused, setPaused] = useState(false)
  const timerRef = useRef(null)
  const wrapRef = useRef(null)

  const count = images.length
  const hasSlides = count > 0

  const next = useCallback(() => {
    if (!count) return
    setIndex((i) => (i + 1) % count)
  }, [count])

  const prev = useCallback(() => {
    if (!count) return
    setIndex((i) => (i - 1 + count) % count)
  }, [count])

  // Autoplay
  useEffect(() => {
    if (!interval || count <= 1 || isPaused) return
    timerRef.current && clearInterval(timerRef.current)
    timerRef.current = setInterval(next, interval)
    return () => clearInterval(timerRef.current)
  }, [interval, count, isPaused, next])

  // Preload next image
  useEffect(() => {
    if (count <= 1) return
    const img = new Image()
    img.src = images[(index + 1) % count]
  }, [index, count, images])

  // Pause on hover
  const onEnter = () => pauseOnHover && setPaused(true)
  const onLeave = () => pauseOnHover && setPaused(false)

  // Keyboard navigation (left/right)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  // Simple fade when the src changes (doesn't interfere with the masks reveal)
  useEffect(() => {
    if (!wrapRef.current) return
    const el = wrapRef.current
    el.style.opacity = 0
    const id = requestAnimationFrame(() => {
      el.style.transition = `opacity ${transitionMs}ms ease`
      el.style.opacity = 1
    })
    return () => cancelAnimationFrame(id)
  }, [index, transitionMs])

  if (!hasSlides) return null

  return (
    <div
      className={`relative w-full select-none ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Slide viewport */}
      <div ref={wrapRef}>
        <ProximityGlass
          key={images[index]} // remount on src to replay entry reveal
          src={images[index]}
          slices={slices}
          height={height}
          className="block"
        />
      </div>

      {/* Arrows */}
      {showArrows && count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white backdrop-blur hover:bg-black/60"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white backdrop-blur hover:bg-black/60"
          >
            ›
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && count > 1 && (
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition ${
                i === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
