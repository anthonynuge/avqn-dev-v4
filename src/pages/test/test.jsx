// ExamplePage.jsx
import React, { useRef, useState, useEffect } from 'react'
import { useGSAP, Observer } from '../../lib/gsapSetup'
import { getFeaturedProjects } from '../../data/projects'
import ProximityGlass from '../../components/AnimatedCarousel/ProximityGlass'

export default function ExamplePage() {
  const scope = useRef(null)
  const projects = getFeaturedProjects()
  // console.log(projects)
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState('left')
  const [revealKey, setRevealKey] = useState(0)

  const count = projects.length

  useEffect(() => {
    console.log('index', projects[index])
  }, [index, projects])

  const next = () => {
    setDir('right')
    setIndex((prev) => (prev + 1) % count)
    setRevealKey((prev) => prev + 1)
  }

  const prev = () => {
    setDir('left')
    setIndex((prev) => (prev - 1 + count) % count)
    setRevealKey((prev) => prev - 1)
  }

  useGSAP(
    () => {
      const obs = Observer.create({
        target: scope.current,
        type: 'wheel',
        preventDefault: true,
        wheelSpeed: -1,
        onUp: () => {
          console.log('Prev')
          prev()
        },
        onDown: () => {
          console.log('Next')
          next()
        },
      })

      return () => obs.kill()
    },
    { scope: scope },
  )

  // set up a gsap context tied to this scope
  return (
    <div ref={scope} className="featured-grid fill-offset">
      <div className="title">{index}</div>

      <div className="carousel-control self-end">
        <button className="carousel-control-button" onClick={prev}>
          <span className="carousel-control-button-icon">←</span>
        </button>
        <button className="carousel-control-button" onClick={next}>
          <span className="carousel-control-button-icon">→</span>
        </button>
      </div>

      <div className="carousel-window relative">
        {projects.map((project, i) => {
          const isCurrent = i === index
          return (
            <div key={`wrap-${i}`} className={`carousel-item ${isCurrent ? 'z-[2]' : 'z-[0]'}`}>
              <ProximityGlass
                revealKey={isCurrent ? revealKey : undefined}
                slices={20}
                sigma={10}
                strength={{ zoomPct: 14, stretchXPct: 10, bgPushPct: 0, blurPx: 2.0 }}
                src={project.demos[0].url}
                className="carousel-item"
                enterFrom={dir}
                revealOnMount={isCurrent}
                interactive={isCurrent}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
