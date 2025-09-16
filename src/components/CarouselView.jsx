'use client'
import ParallaxImage from './shared/ParallaxImage'

/**
 * Stateless media window for your carousel.
 * - Renders exactly one image based on `index`.
 * - No state, no controls.
 */
export default function CarouselView({
  images = [], // string[] of URLs
  index = 0, // which image to show
  altPrefix = 'Slide', // used to build alt text
  shift = -200, // passed to ParallaxImage
  className = '',
  heightClass = 'h-[40dvh] md:h-[60dvh]',
}) {
  if (!images.length) return null
  const safeIndex = ((index % images.length) + images.length) % images.length
  const src = images[safeIndex]

  return (
    <div className={`relative overflow-hidden ${heightClass} ${className}`}>
      {/* Fill the frame; ParallaxImage is absolute/inset-0 internally */}
      <ParallaxImage src={src} alt={`${altPrefix} ${safeIndex + 1}`} shift={shift} />

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0">
        {/* top gradient */}
        <div className="absolute top-0 right-0 left-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />
        {/* bottom gradient */}
        <div className="absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
    </div>
  )
}
