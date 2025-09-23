// ExamplePage.js// ExamplePage.jsx
import React, { useRef, useEffect, useMemo, useState } from 'react'
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

  // Memoize and grab once on load featured projects
  const projects = useMemo(() => getFeaturedProjects(), [])

  useEffect(() => {
    if (!canvasRef.current || !projects?.length) return
    const urls = projects.map((p) => p?.demos?.[0]?.url).filter(Boolean)
    console.log('urls loaded into canvas:', urls)
    canvasRef.current?.setImages(urls)
  }, [projects])

  // ---- keep FeaturedCanvas backing store in sync with wrapper size ----
  useEffect(() => {
    if (!wrapRef.current || !canvasRef.current) return
    const el = wrapRef.current

    // initial measure (important so shader has correct resolution on first frame)
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

  const next = () => {
    if (!projects?.length) return
    const i = (index + 1) % projects.length
    setIndex(i)
    // set direction for NEXT (left -> right)
    canvasRef.current?.setDirection?.(1.0)
    canvasRef.current?.show(i)
  }

  const prev = () => {
    if (!projects?.length) return
    const i = (index - 1 + projects.length) % projects.length
    setIndex(i)
    // set direction for PREV (right -> left)
    canvasRef.current?.setDirection?.(-1.0)
    canvasRef.current?.show(i)
  }

  // set up a gsap context tied to this scope
  return (
    <div ref={scope} className="featured-grid fill-offset">
      <div className="title">{index}</div>

      <div className="carousel-control self-end">
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
      </div>

      <div
        className="carousel-window relative aspect-video overflow-hidden bg-yellow-100/40"
        ref={wrapRef}
      >
        <FeaturedCanvas ref={canvasRef} />
      </div>
    </div>
  )
}
