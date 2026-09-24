'use client'
import { useEffect, useRef, useState } from 'react'
import ParallaxImage from './shared/ParallaxImage'

/**
 * Stateless media window for your carousel.
 * - All slides stay mounted and stacked; `index` crossfades between them, so switching never
 *   reloads media (swapping a single element's src flashed the background while it loaded).
 * - Only the active video plays; it restarts from the top each time it's shown.
 * - Loading window: only the current and next slide get media, so Next is still instant; slides
 *   already shown stay loaded (so Prev is too). The rest stay empty until the visitor gets close.
 * - No controls.
 */
export default function CarouselView({
  images = [], // string[] of {URLs, overlay: boolean}
  index = 0, // which image to show
  shift = -200, // passed to ParallaxImage
  className = '',
  backdrop,
  heightClass = 'h-[40vh] md:h-[60vh]',
}) {
  const videoRefs = useRef([])
  const safeIndex = images.length ? ((index % images.length) + images.length) % images.length : 0

  // Slides that have been shown keep their media (set-state-during-render: derived, no extra pass)
  const [seen, setSeen] = useState(() => new Set([safeIndex]))
  if (!seen.has(safeIndex)) setSeen(new Set(seen).add(safeIndex))
  const n = images.length
  // ponytail: Prev from the very first slide (wraps to the last) is the one unpreloaded case;
  // it fades in from the backdrop instead of cutting. Add the previous slide if that bothers anyone.
  const isLoaded = (i) => seen.has(i) || i === (safeIndex + 1) % n

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === safeIndex) {
        v.currentTime = 0
        v.play().catch(() => {}) // autoplay can be refused; the first frame still shows
      } else {
        v.pause()
      }
    })
  }, [safeIndex])

  if (!images.length) return null
  const hasOverlay = backdrop && images.some((s) => s.overlay)

  return (
    <div className={`relative isolate overflow-hidden ${heightClass} ${className}`}>
      {/* Shared backdrop behind overlay slides; mounted once so its parallax never restarts */}
      {hasOverlay && <ParallaxImage src={backdrop} alt="" shift={shift} priority />}

      {images.map((slide, i) => (
        <div
          key={slide.url}
          aria-hidden={i !== safeIndex}
          className={`absolute inset-0 isolate transition-opacity duration-500 ease-out motion-reduce:transition-none ${
            i === safeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          {!isLoaded(i) ? null : slide.overlay && backdrop ? (
            <>
              <div className="absolute inset-0 z-[1] bg-black/50" />
              {slide.type === 'video' ? (
                <video
                  ref={(el) => (videoRefs.current[i] = el)}
                  src={slide.url}
                  aria-label={slide.alt}
                  className="absolute top-1/2 left-1/2 z-[2] aspect-video w-[95%] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-700 ease-out motion-reduce:transition-none md:h-[525px] md:w-auto"
                  // transparent until the first frame decodes, so fade it in rather than pop
                  onLoadedData={(e) => (e.currentTarget.style.opacity = 1)}
                  preload="auto"
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={slide.url}
                  alt={slide.alt}
                  className="absolute top-1/2 left-1/2 z-[2] w-[95%] -translate-x-1/2 -translate-y-1/2 md:h-[525px] md:w-auto"
                />
              )}
            </>
          ) : (
            <ParallaxImage src={slide.url} alt={slide.alt} shift={shift} />
          )}
        </div>
      ))}

      {/* Gradient overlay. Slides are isolated and this sits at z-10, so the layering never changes;
          otherwise a fading slide dropped below the gradients and popped back over them when done */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* top gradient */}
        <div className="absolute top-0 right-0 left-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />
        {/* bottom gradient */}
        <div className="absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
    </div>
  )
}
