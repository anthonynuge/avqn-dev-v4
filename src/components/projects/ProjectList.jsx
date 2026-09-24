// src/components/projects/ProjectList.jsx
import { memo, useCallback, useEffect, useMemo, useRef, useState, startTransition } from 'react'
import useCanHover from '../../lib/utils/useCanHover'
import { topStack } from '../../data/filters'

// Shared by header + rows so columns align: [date] name [stack] focus [status]
// Wide screens: name/stack/focus share the leftover space (1 : 1.25 : 0.75) above minimums that
// fit their content (longest name ~168px, stack ~252px), and status is a fixed column at the right edge.
// Tracks use fixed bounds, not content sizing, so every row lines up. Mins sum to ~745px, so it
// fits the ~770px list at 1280px.
const COLS =
  'grid grid-cols-[1fr_6.5rem] gap-2 md:grid-cols-[5rem_1fr_6.5rem] xl:grid-cols-[5rem_minmax(11.5rem,1fr)_minmax(16rem,1.25fr)_minmax(6.5rem,0.75fr)_5.5rem]'

const ProjectList = memo(function ProjectList({
  projects,
  onProjectHover,
  onProjectLeave,
  onProjectClick,
  showPinned,
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
        // Order by end date; if no end date, use start date (effective date)
        const aEffective = new Date((a.dates?.ended ?? a.dates?.started) || 0)
        const bEffective = new Date((b.dates?.ended ?? b.dates?.started) || 0)
        A = aEffective
        B = bEffective
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

  // Featured projects pin to the top, but only in the default view (unfiltered, newest first);
  // any sort or filter gives a plain list
  // (newest 3 featured only; the rest stay in date order under All)
  const pinned = sorted.filter((p) => p.featured).slice(0, 3)
  const groups =
    showPinned && sortBy === 'date' && sortOrder === 'desc' && pinned.length
      ? [
          ['Pinned', pinned],
          ['All', sorted.filter((p) => !pinned.includes(p))],
        ]
      : null

  // One table row; also used inside the pinned/all groups
  const renderRow = (p) => (
    <div
      key={p.id}
      data-proj-id={p.id}
      tabIndex={0}
      onFocus={() => onRowFocus(p.id)}
      onClick={() => onProjectClick?.(p)}
      className={`hover:bg-accent hover:text-bg focus:bg-accent focus:text-bg group ${COLS} cursor-pointer p-2 transition-transform duration-150 will-change-[transform]`}
      style={{
        contentVisibility: 'auto', // let browser skip offscreen work
        containIntrinsicSize: '1px 48px', // fallback size to avoid jumps
      }}
    >
      {/* Date - hidden on mobile, 2-col layout: title + type only */}
      <div className="hidden items-center md:flex">
        <span className="font-mono text-xs whitespace-nowrap opacity-80">
          {/* YYYY.MM straight from the ISO date string */}
          {(p.dates.ended ?? p.dates.started).slice(0, 7).replace('-', '.')}
        </span>
      </div>

      {/* Project Name */}
      <div className="flex items-center font-mono uppercase">
        <span className="text-xs md:text-sm">{p.name}</span>
      </div>

      {/* Stack - wide screens only */}
      <div className="hidden min-w-0 items-center xl:flex">
        <span className="truncate font-mono text-xs uppercase opacity-80">
          {topStack(p).join(' / ')}
        </span>
      </div>

      {/* Focus */}
      <div className="flex items-center font-mono uppercase">
        <span className="text-xs">{p.type}</span>
      </div>

      {/* Status - wide screens only. Left-aligned with a fixed dot slot so dots and labels
          line up. Filled = done, outline = in progress, accent = usable now:
          live = accent fill, repo = muted fill, wip = muted outline, archived = empty */}
      <div className="hidden items-center gap-2 font-mono text-xs uppercase xl:flex">
        <span
          className={`size-1.5 shrink-0 rounded-full ${
            {
              live: 'bg-accent group-hover:bg-bg group-focus:bg-bg',
              repo: 'group-hover:bg-bg group-focus:bg-bg bg-[hsl(var(--fg-muted))]',
              wip: 'group-hover:border-bg group-focus:border-bg border border-[hsl(var(--fg-muted))]',
            }[p.status] ?? ''
          }`}
        />
        <span className={p.status === 'live' ? '' : 'opacity-50'}>{p.status}</span>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      {/* Header - solid bg so scroll content never shows through */}
      <div className="border-accent/10 bg-bg relative z-10 shrink-0 border-b p-2 md:pt-0">
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

      {/* Table - scrollable; minimal scrollbar via .project-list-scroll */}
      <div className="project-list-scroll min-h-0 flex-1 overflow-auto">
        <div className="min-w-full">
          {/* Table Header */}
          <div className="border-accent/10 bg-bg supports-[backdrop-filter]:bg-bg/95 sticky top-0 z-10 border-b backdrop-blur">
            <div
              className={`text-accent/80 ${COLS} p-2 font-mono text-xs tracking-wider uppercase`}
            >
              <button
                onClick={() => handleSort('date')}
                className="hover:text-accent hidden items-center gap-1 transition-colors md:flex"
              >
                DATE {icon('date')}
              </button>
              <button
                onClick={() => handleSort('name')}
                className="hover:text-accent flex items-center gap-1 transition-colors"
              >
                PROJECT NAME {icon('name')}
              </button>
              <span className="hidden items-center xl:flex">STACK</span>
              <button
                onClick={() => handleSort('type')}
                className="hover:text-accent flex items-center gap-1 transition-colors"
              >
                FOCUS {icon('type')}
              </button>
              <span className="hidden items-center xl:flex">STATUS</span>
            </div>
          </div>

          {/* Delegation root */}
          <div ref={tableRef} className="divide-accent/10 divide-y">
            {groups
              ? groups.map(([label, rows]) => [
                  <div
                    key={label}
                    className="text-accent p-2 font-mono text-xs tracking-wider uppercase"
                  >
                    // {label}
                  </div>,
                  ...rows.map(renderRow),
                ])
              : sorted.map(renderRow)}
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
