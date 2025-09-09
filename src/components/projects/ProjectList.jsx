// src/components/projects/ProjectList.jsx
import { memo, useCallback, useEffect, useMemo, useRef, useState, startTransition } from 'react'
import useCanHover from '../../lib/utils/useCanHover'

const ProjectList = memo(function ProjectList({
  projects,
  onProjectHover,
  onProjectLeave,
  onProjectClick,
}) {
  const canHover = useCanHover()

  const [sortBy, setSortBy] = useState('date') // 'date' | 'name' | 'type'
  const [sortOrder, setSortOrder] = useState('desc') // 'asc' | 'desc'

  // ---- Sorting (fixed toggle behavior)
  const handleSort = useCallback(
    (field) => {
      if (sortBy === field) {
        // Same field - toggle order
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'))
      } else {
        // Different field - set new field and default to desc
        setSortBy(field)
        setSortOrder('desc')
      }
    },
    [sortBy],
  )

  const sorted = useMemo(() => {
    const arr = projects.slice()
    arr.sort((a, b) => {
      let A, B
      if (sortBy === 'date') {
        A = new Date(a.date)
        B = new Date(b.date)
      } else if (sortBy === 'name') {
        A = (a.name || '').toLowerCase()
        B = (b.name || '').toLowerCase()
      } else if (sortBy === 'type') {
        A = (a.type || '').toLowerCase()
        B = (b.type || '').toLowerCase()
      } else {
        return 0
      }
      if (A < B) return sortOrder === 'asc' ? -1 : 1
      if (A > B) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
    return arr
  }, [projects, sortBy, sortOrder])

  const icon = (f) => (sortBy !== f ? '↕' : sortOrder === 'asc' ? '↑' : '↓')

  // ---- id → project map for O(1) lookup
  const mapById = useMemo(() => {
    const m = new Map()
    for (const p of sorted) m.set(String(p.id), p)
    return m
  }, [sorted])

  // ---- Delegated hover with intent + rAF (mounted only when hover exists)
  const tableRef = useRef(null)
  const rafRef = useRef(0)
  const intentRef = useRef(0)
  const lastIdRef = useRef(null)

  const commitHover = useCallback(
    (p) => {
      if (!p || lastIdRef.current === p.id) return
      lastIdRef.current = p.id
      startTransition(() => onProjectHover?.(p)) // low-priority update
    },
    [onProjectHover],
  )

  useEffect(() => {
    if (!canHover) return // do not mount listeners on touch devices
    const root = tableRef.current
    if (!root) return

    const over = (e) => {
      const row = e.target.closest('[data-proj-id]')
      if (!row || !root.contains(row)) return
      clearTimeout(intentRef.current)
      const id = row.getAttribute('data-proj-id')
      const p = mapById.get(id)
      if (!p) return

      intentRef.current = setTimeout(() => {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => commitHover(p))
      }, 90) // hover intent (75–120ms sweet spot)
    }

    const out = (e) => {
      const to = e.relatedTarget
      if (root.contains(to)) return // moved within the table
      clearTimeout(intentRef.current)
      lastIdRef.current = null
      onProjectLeave?.()
    }

    root.addEventListener('pointerover', over)
    root.addEventListener('pointerout', out)
    return () => {
      root.removeEventListener('pointerover', over)
      root.removeEventListener('pointerout', out)
      clearTimeout(intentRef.current)
      cancelAnimationFrame(rafRef.current)
    }
  }, [canHover, commitHover, mapById, onProjectLeave])

  // ---- Prewarm covers for rows entering viewport (only when hover exists)
  useEffect(() => {
    if (!canHover || !('IntersectionObserver' in window)) return
    const root = tableRef.current
    if (!root) return

    const seen = new Set()
    const prewarm = (src) => {
      if (!src || seen.has(src)) return
      const img = new Image()
      img.src = src
      img
        .decode?.()
        .catch(() => {})
        .finally(() => seen.add(src))
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue
          const id = en.target.getAttribute('data-proj-id')
          const p = mapById.get(id)
          if (p?.cover) prewarm(p.cover)
        }
      },
      { root, rootMargin: '200px 0px 400px 0px', threshold: 0 },
    )

    root.querySelectorAll('[data-proj-id]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [canHover, mapById])

  // ---- Keyboard focus previews (good a11y on all devices)
  const onRowFocus = useCallback(
    (id) => {
      const p = mapById.get(String(id))
      if (p) commitHover(p)
    },
    [commitHover, mapById],
  )

  return (
    <div className="project-scrollbar flex flex-1 flex-col overflow-hidden">
      {/* Header */}
      <div className="p-2">
        <div className="flex items-center justify-between">
          <h1 className="text-accent font-mono text-sm tracking-wider uppercase">
            PROJECTS ({projects.length})
          </h1>
          <div className="text-fg-subtle flex items-center gap-4 font-mono text-xs">
            <span>VIEW: LIST</span>
            <span>|</span>
            <span>FILTERED: {projects.length}</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-full">
          {/* Table Header */}
          <div className="bg-bg/80 supports-[backdrop-filter]:bg-bg/60 sticky top-0 border-b backdrop-blur">
            <div className="text-accent/80 grid grid-cols-12 gap-4 p-2 font-mono text-xs tracking-wider uppercase">
              <button
                onClick={() => handleSort('date')}
                className="hover:text-accent col-span-2 flex items-center gap-1 transition-colors"
              >
                DATE {icon('date')}
              </button>
              <button
                onClick={() => handleSort('name')}
                className="hover:text-accent col-span-6 flex items-center gap-1 transition-colors"
              >
                PROJECT NAME {icon('name')}
              </button>
              <button
                onClick={() => handleSort('type')}
                className="hover:text-accent col-span-4 flex items-center gap-1 transition-colors"
              >
                TYPE {icon('type')}
              </button>
            </div>
          </div>

          {/* Delegation root */}
          <div ref={tableRef} className="divide-accent/10 divide-y">
            {sorted.map((p) => (
              <div
                key={p.id}
                data-proj-id={p.id}
                tabIndex={0}
                onFocus={() => onRowFocus(p.id)}
                onClick={() => onProjectClick?.(p)}
                className="hover:bg-accent hover:text-bg focus:bg-accent focus:text-bg grid cursor-pointer grid-cols-12 gap-2 p-2 transition-transform duration-150 will-change-[transform]"
                style={{
                  contentVisibility: 'auto', // let browser skip offscreen work
                  containIntrinsicSize: '1px 48px', // fallback size to avoid jumps
                }}
              >
                {/* Date */}
                <div className="col-span-2 flex items-center">
                  <span className="font-mono text-xs opacity-80">
                    {new Date(p.date).toLocaleDateString('en-CA')}
                  </span>
                </div>

                {/* Project Name */}
                <div className="col-span-6 flex items-center">
                  <span className="text-sm">// {p.name}</span>
                </div>

                {/* Type */}
                <div className="col-span-4 flex items-center">
                  <span className="text-xs">{p.type}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {!projects.length && (
            <div className="flex h-64 items-center justify-center">
              <div className="text-center">
                <div className="text-accent/50 mb-2 font-mono text-sm tracking-wider uppercase">
                  NO PROJECTS FOUND
                </div>
                <div className="text-fg-subtle font-mono text-xs">Try adjusting your filters</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

export default ProjectList
