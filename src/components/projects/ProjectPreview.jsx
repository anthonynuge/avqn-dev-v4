import { memo, useEffect, useRef, useState } from 'react'

// Tiny in-memory cache of decoded URLs
const decoded = new Set()

function preload(src) {
  if (!src) return Promise.reject()
  if (decoded.has(src)) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = async () => {
      try {
        await img.decode?.()
      } catch {
        console.error('Error decoding image', src)
      }
      decoded.add(src)
      resolve()
    }
    img.onerror = reject
    img.src = src
  })
}

const ProjectPreview = memo(({ project }) => {
  const [curSrc, setCurSrc] = useState(project?.backdrop.url || '')
  const [prevSrc, setPrevSrc] = useState('')
  const [ready, setReady] = useState(Boolean(project?.backdrop.url))
  const lastReq = useRef('')
  const mounted = useRef(true)

  useEffect(
    () => () => {
      mounted.current = false
    },
    [],
  )

  useEffect(() => {
    const next = project?.backdrop.url || ''
    if (!next) {
      setPrevSrc('')
      setCurSrc('')
      setReady(false)
      return
    }

    if (decoded.has(next)) {
      setPrevSrc(curSrc)
      setCurSrc(next)
      setReady(true)
      return
    }

    lastReq.current = next
    setPrevSrc(curSrc)
    setReady(false)

    preload(next)
      .then(() => {
        if (!mounted.current || lastReq.current !== next) return
        setCurSrc(next)
        setReady(true)
      })
      .catch(() => {
        if (!mounted.current) return
        // keep previous image; avoid flashing
        setReady(true)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.backdrop.url])

  if (!project) {
    return (
      <div className="flex h-64 items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-fg-subtle mb-2 font-mono text-sm uppercase">SELECT A PROJECT</div>
          <div className="text-fg-subtle font-mono text-xs">Choose a project to view details</div>
        </div>
      </div>
    )
  }

  const title = project?.name ?? ''
  const desc = project?.description ?? ''
  const alt = title ? `${title} backdrop` : ''

  return (
    <div className="relative flex h-full flex-col" style={{ contain: 'content' }}>
      <div className="relative flex-1 overflow-hidden">
        {prevSrc && prevSrc !== curSrc && (
          <img
            key={`prev-${prevSrc}`}
            src={prevSrc}
            alt={alt}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-150"
            draggable={false}
            decoding="async"
            loading="lazy"
          />
        )}

        {curSrc ? (
          <img
            key={`cur-${curSrc}`}
            src={curSrc}
            alt={alt}
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-200 ease-out ${ready ? 'opacity-100' : 'opacity-0'} motion-safe:hover:[transform:scale(1.03)] motion-safe:hover:will-change-transform`}
            draggable={false}
            decoding="async"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-fg-subtle font-mono text-sm">Image not available</div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
        <div className="absolute bottom-4 left-4 max-w-[85%] text-white">
          <h2 className="font-bold tracking-wider uppercase">{title}</h2>
          <p className="line-clamp-2 text-sm/5 opacity-90">{desc}</p>
        </div>
      </div>
    </div>
  )
})

ProjectPreview.displayName = 'ProjectPreview'
export default ProjectPreview
