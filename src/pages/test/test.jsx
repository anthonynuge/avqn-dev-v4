// ExamplePage.js// ExamplePage.js// ExamplePage.jsx
import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react'
import { useGSAP, Observer } from '../../lib/gsapSetup'
import { getFeaturedProjects } from '../../data/projects'
import FeaturedCanvas from '../../components/AnimatedCarousel/FeaturedCanvas'

export default function ExamplePage() {
  const scope = useRef(null)
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    console.log('Test page loaded')
  }, [])

  // Grab featured projects once
  const projects = useMemo(() => getFeaturedProjects(), [])

  // Load images into the canvas once projects are ready
  useEffect(() => {
    if (!canvasRef.current || !projects?.length) return
    const urls = projects.map((p) => p?.featuredCanvas).filter(Boolean)
    console.log('urls loaded into canvas:', urls)
    canvasRef.current?.setImages(urls)
  }, [projects])

  // Keep FeaturedCanvas backing store in sync with wrapper size
  useEffect(() => {
    if (!wrapRef.current || !canvasRef.current) return
    const el = wrapRef.current

    // initial measure (so shader has correct resolution on first frame)
    const initRect = el.getBoundingClientRect()
    canvasRef.current.resize(Math.round(initRect.width), Math.round(initRect.height))

    let ticking = false
    const ro = new ResizeObserver(([entry]) => {
      if (!entry || ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const { width, height } = entry.contentRect
        canvasRef.current?.resize(Math.round(width), Math.round(height))
      })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Navigation helpers
  const next = useCallback(() => {
    if (!projects?.length) return
    const i = (index + 1) % projects.length
    setIndex(i)
    canvasRef.current?.setDirection?.(1.0) // left → right
    canvasRef.current?.show(i)
  }, [projects?.length, index])

  const prev = useCallback(() => {
    if (!projects?.length) return
    const i = (index - 1 + projects.length) % projects.length
    setIndex(i)
    canvasRef.current?.setDirection?.(-1.0) // right → left
    canvasRef.current?.show(i)
  }, [projects?.length, index])

  // Store current functions in refs so Observer can access them
  const nextRef = useRef(next)
  const prevRef = useRef(prev)

  // Update refs when functions change
  useEffect(() => {
    nextRef.current = next
    prevRef.current = prev
  }, [next, prev])

  // GSAP Observer: wheel / swipe / drag to navigate
  useGSAP(
    () => {
      if (!scope.current) return

      const TRANSITION_MS = 650 // match FeaturedCanvas tween
      let locked = false
      const lock = () => {
        locked = true
        setTimeout(() => (locked = false), TRANSITION_MS + 450)
      }

      const isAnimating = () => canvasRef.current?.isAnimating?.() === true

      const goNext = () => {
        console.log('locked', locked, ' isAnimating', isAnimating())
        if (locked || isAnimating()) return
        nextRef.current() // Use ref to get current function
        lock()
      }
      const goPrev = () => {
        console.log('locked', locked, ' isAnimating', isAnimating())
        if (locked || isAnimating()) return
        prevRef.current() // Use ref to get current function
        lock()
      }

      const ob = Observer.create({
        target: window, // Global scroll events
        type: 'wheel', // Only wheel events for global scrolling
        preventDefault: false, // Allow normal page scroll
        wheelSpeed: 1,
        tolerance: 10,
        onDown: goNext, // wheel down = next
        onUp: goPrev, // wheel up = previous
      })

      return () => ob.kill()
    },
    { scope },
  )

  // Global keyboard events for navigation
  useEffect(() => {
    const onKey = (e) => {
      console.log('Key pressed:', e.key)
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextRef.current()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevRef.current()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div ref={scope} className="featured-grid fill-offset">
      <div className="title">{index}</div>

      <div className="carousel-control self-end">
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
      </div>

      {/* The "window" controls the size; canvas just fills it */}
      <div
        ref={wrapRef}
        className="carousel-window relative aspect-video w-full touch-none overflow-hidden overscroll-contain bg-black select-none"
      >
        <FeaturedCanvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </div>
    </div>
  )
}
