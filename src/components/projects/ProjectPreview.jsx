import { memo, useState, useEffect } from 'react'
import LinkButton from '../ui/LinkButton'

const ProjectPreview = memo(({ project }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (project?.cover) {
      setImageLoaded(false)
      setImageError(false)

      // Preload the image
      const img = new Image()
      img.onload = () => setImageLoaded(true)
      img.onerror = () => setImageError(true)
      img.src = project.cover
    }
  }, [project?.cover])

  if (!project) {
    return (
      <div className="flex h-64 items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-fg-subtle mb-2 font-mono text-sm uppercase">SELECT A PROJECT</div>
          <div className="text-fg-subtle font-mono text-xs">
            Choose a project from the list to view details
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="project-preview-container flex h-full flex-col">
      <div className="relative flex-1 overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <div className="text-fg-subtle font-mono text-sm">Loading...</div>
          </div>
        )}
        {imageError && (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <div className="text-fg-subtle font-mono text-sm">Image not available</div>
          </div>
        )}
        {imageLoaded && (
          <img
            src={project.cover}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-200 ease-out hover:scale-105"
            style={{ willChange: 'transform' }}
            loading="eager"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
        <div className="text-accent absolute bottom-4 left-4">
          <h2 className="text-lg font-bold tracking-wider uppercase">{project.name}</h2>
          <p className="line-clamp-2 text-sm opacity-90">{project.description}</p>
        </div>
      </div>
    </div>
  )
})

ProjectPreview.displayName = 'ProjectPreview'

export default ProjectPreview
