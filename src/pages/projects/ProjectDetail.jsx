import { useParams } from 'react-router'
import { Fragment, useEffect, useState, useMemo, useRef } from 'react'
import { useGSAP, gsap, Observer } from '../../lib/gsapSetup'
import { scrambleInAll } from '../../lib/animations/scramble'
import { flicker } from '../../lib/animations/flicker'
import useTransition from '../../transition/useTransition'
import { projects } from '../../data/projects'
import LinkButton from '../../components/ui/LinkButton'
import CarouselView from '../../components/CarouselView'

const ProjectDetail = () => {
  const { projectSlug } = useParams()
  const [index, setIndex] = useState(0)
  const scope = useRef(null)
  const carouselRef = useRef(null)
  const { lock } = useTransition()

  // Find the project by slug
  const project = projects.find((p) => p.slug === projectSlug)

  // Stable reference for images
  const images = useMemo(() => project.demos.filter(Boolean) ?? [], [project?.demos])

  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length)
  const next = () => setIndex((prev) => (prev + 1) % images.length)

  // Entry: scramble the title, flicker the copy in after it. Replays per project.
  useGSAP(
    () => {
      if (!scope.current) return
      const q = (sel) => scope.current.querySelectorAll(sel)
      const words = q('[data-in="scramble"]')
      const copy = q('[data-in="flicker"]')
      const fades = q('[data-in="fade"] > *') // each button, so they can stagger
      gsap.set([...words, ...copy, ...fades], { autoAlpha: 0 })

      const unlock = lock()
      const tl = gsap.timeline({ delay: 0.2, onComplete: unlock })
      tl.add(scrambleInAll(words, { duration: 0.9 }))
      // Hairlines draw left → right as the features flicker on
      tl.fromTo(
        q('[data-line]'),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08 },
        0.38,
      )
      copy.forEach((el, i) => {
        tl.add(flicker(el, { boot: 0.4, duration: 0.8, blips: 3 }), 0.3 + i * 0.08)
      })
      // Buttons land once the copy has settled: slow fade, one after the other
      tl.fromTo(
        fades,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1, ease: 'power3.out', stagger: 0.15 },
        '>-0.2',
      )
      return unlock
    },
    { scope, dependencies: [projectSlug, lock], revertOnUpdate: true },
  )

  // Sideways gestures on the carousel: trackpad swipe / horizontal wheel / touch swipe.
  // Vertical scroll is left alone so the page still scrolls past it.
  useGSAP(
    () => {
      if (!carouselRef.current || images.length < 2) return
      let armed = true // one slide per gesture; trackpad momentum keeps firing until it stops
      const go = (step) => {
        if (!armed) return
        armed = false
        setIndex((i) => (i + step + images.length) % images.length)
      }
      Observer.create({
        target: carouselRef.current,
        type: 'wheel,touch',
        lockAxis: true,
        tolerance: 30,
        wheelSpeed: -1, // make wheel match touch: content moving left = next
        onLeft: () => go(1),
        onRight: () => go(-1),
        onStop: () => (armed = true),
        onStopDelay: 0.2,
      })

      // Swallow sideways wheel so a trackpad swipe doesn't trigger browser back/forward
      const el = carouselRef.current
      const block = (e) => Math.abs(e.deltaX) > Math.abs(e.deltaY) && e.preventDefault()
      el.addEventListener('wheel', block, { passive: false })
      return () => el.removeEventListener('wheel', block)
    },
    { scope: carouselRef, dependencies: [images.length] },
  )

  // Arrow keys step the carousel while it's on screen
  useEffect(() => {
    if (images.length < 2) return
    const onKey = (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      const r = carouselRef.current?.getBoundingClientRect()
      if (!r || r.bottom < 0 || r.top > window.innerHeight) return
      const step = e.key === 'ArrowRight' ? 1 : -1
      setIndex((i) => (i + step + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [images.length])

  if (!project) {
    return (
      <div className="inner fill-offset py-10">
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <h1 className="text-accent mb-4 text-2xl font-bold uppercase">Project Not Found</h1>
            <p className="text-fg-subtle mb-6">The project you're looking for doesn't exist.</p>
            <LinkButton to="/projects">Back to Projects</LinkButton>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="" ref={scope} key={projectSlug}>
      <div className="inner grid-12 relative min-h-[60vh] gap-y-6 pt-8 pb-16 md:py-24">
        <h1 className="text-accent text-fluid-title col-span-full self-end font-mono font-bold uppercase lg:col-span-5 lg:col-start-2 lg:self-start">
          {/* Scramble per word: the plugin fills spaces with letters, so one span would
              lose its line breaks and overflow until the text resolves */}
          {project.name.split(' ').map((word, i) => (
            <Fragment key={i}>
              {i > 0 && ' '}
              <span className="inline-block" data-in="scramble" data-text={word}>
                {word}
              </span>
            </Fragment>
          ))}
        </h1>

        {/* Right Column */}
        <div className="col-span-full space-y-4 md:max-w-2xl lg:col-span-6 lg:col-start-7">
          <p className="text-xs md:text-sm lg:text-base" data-in="flicker">
            {project.description}
          </p>
          {/* Meta */}
          <div className="grid grid-cols-2 gap-y-2 md:grid-cols-6">
            {/* Features */}
            {/* Spec-sheet rows: hairlines run to the button's edge so the empty right side reads as framed */}
            <div className="relative col-span-full grid grid-cols-subgrid pt-3">
              <span data-line className="bg-fg/15 absolute inset-x-0 top-0 h-px origin-left" />
              <div className="text-meta-title" data-in="flicker">
                Features
              </div>
              <ul className="col-span-full mt-2 self-start md:col-start-4 md:mt-0 lg:col-start-3 xl:col-start-4">
                {project.features.map((feature, i) => (
                  <li
                    className="text-meta-item relative flex gap-4 py-1.5 first:pt-0"
                    key={feature}
                    data-in="flicker"
                  >
                    <span className="text-accent/50">{String(i + 1).padStart(2, '0')}</span>
                    {feature}
                    {i < project.features.length - 1 && (
                      <span
                        data-line
                        className="bg-fg/15 absolute inset-x-0 bottom-0 h-px origin-left"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Links */}
          <div className="flex w-full flex-col gap-2" data-in="fade">
            {project.links.live && (
              <LinkButton to={project.links.live} external className="w-full md:h-8">
                View Live Site
              </LinkButton>
            )}
            {project.links.repo && (
              <LinkButton to={project.links.repo} external className="w-full md:h-8">
                View Code
              </LinkButton>
            )}
          </div>
        </div>

        <h3
          data-in="flicker"
          className="text-accent inner text-fluid-subheading-1 absolute bottom-0 left-0 z-10 translate-y-1/2 font-bold uppercase"
        >
          {project.id}
        </h3>
      </div>

      <div className="relative flex-1">
        {/* Carosuel Container */}
        {/* pan-y keeps vertical touch scrolling native; sideways swipes go to the carousel */}
        <div ref={carouselRef} className="touch-pan-y">
          <CarouselView
            images={images}
            shift={-200}
            index={index}
            backdrop={project.backdrop.url}
          />
        </div>

        {/* Carousel Controls: just above the carousel. `inner` + md:pr-6 mirrors the navbar
            (page padding + the links' md:pr-6), so Next ends where the nav text does */}
        <div className="inner absolute inset-x-0 -top-8 z-50">
          <div className="flex h-5 items-center justify-end gap-3 md:gap-6 md:pr-6">
            <button
              onClick={prev}
              className="text-caption-2 text-accent cursor-pointer"
              data-in="flicker"
            >
              Prev
            </button>
            {images.map((_, i) => (
              <span
                key={i}
                className={`${index === i ? 'bg-accent h-5 w-1' : 'bg-accent/50 h-1 w-1 flex-shrink'} transition-all duration-400 ease-in-out`}
              />
            ))}
            <button
              onClick={next}
              className="text-caption-2 text-accent cursor-pointer"
              data-in="flicker"
            >
              Next
            </button>
          </div>
        </div>

        {/* Specifications Container */}
        <div className="inner relative">
          <h3 className="text-accent text-fluid-subheading absolute top-0 right-8 z-10 -translate-y-1/2">
            Specifications
          </h3>

          <div className="grid-12 py-14">
            <div className="col-span-full grid grid-cols-subgrid gap-y-4 md:col-[4/12]">
              {Object.entries(project.tech)
                .filter(([, value]) => value.length) // skip empty groups (e.g. frontend-only sites)
                .map(([key, value]) => (
                  <div key={key} className="col-span-2 md:col-span-2">
                    <div className="text-accent font-mono text-sm uppercase">{key}</div>
                    <ul className="text-caption-2 flex flex-col">
                      {value.map((tech) => (
                        <li key={tech} className="text-caption-2">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectDetail
