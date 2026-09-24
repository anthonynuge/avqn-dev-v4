import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import FilterPanel from '../../components/projects/FilterPanel'
import ProjectList from '../../components/projects/ProjectList'
import ProjectPreview from '../../components/projects/ProjectPreview'
import { projects } from '../../data/projects'
import { hasSkill, initialFilters } from '../../data/filters'
import { useGSAP, gsap } from '../../lib/gsapSetup'
import useCanHover from '../../lib/utils/useCanHover'

const ProjectIndex = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState(initialFilters)
  const [hoveredProject, setHoveredProject] = useState(null)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const hoverTimeoutRef = useRef(null)
  const ref = useRef(null)
  const canHover = useCanHover()

  useGSAP(
    () => {
      gsap.fromTo(
        ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: 'power2.out', delay: 0.4 },
      )
    },
    { scope: ref },
  )

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  // Every active filter must match; selected capabilities/skills are AND-ed so a recruiter can check a job's full stack
  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (p) =>
          (!filters.category || p.type === filters.category) &&
          (!filters.origin || p.origin === filters.origin) &&
          (!filters.live || p.status === 'live') &&
          filters.capabilities.every((c) => p.capabilities.includes(c)) &&
          filters.skills.every((s) => hasSkill(p, s)),
      ),
    [filters],
  )

  const handleProjectHover = useCallback((project) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }

    // Set the hovered project immediately for better responsiveness
    setHoveredProject(project)
  }, [])

  const handleProjectLeave = useCallback(() => {
    // Add a small delay to prevent flickering when moving between items
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredProject(null)
    }, 100)
  }, [])

  const handleProjectClick = useCallback(
    (project) => {
      navigate(`/projects/${project.slug}`)
    },
    [navigate],
  )

  const activeFilters =
    (filters.category ? 1 : 0) +
    (filters.origin ? 1 : 0) +
    (filters.live ? 1 : 0) +
    filters.capabilities.length +
    filters.skills.length

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen)
  }

  return (
    <section className="inner fill-offset overflow-hidden" ref={ref}>
      {/* Filter toggle shares the title row below 880px (side-by-side layout shows the panel) */}
      <div className="flex items-end justify-between">
        <h1 className="project-index-header text-accent text-display-1 font-mono text-4xl leading-tight font-bold uppercase">
          Archive
        </h1>
        <button
          onClick={toggleMobileFilter}
          aria-expanded={isMobileFilterOpen}
          className="text-accent/70 hover:text-accent pb-2 font-mono text-xs tracking-wider uppercase transition-colors min-[880px]:hidden"
        >
          {isMobileFilterOpen
            ? '// Close'
            : `// Filter${activeFilters ? ` (${activeFilters})` : ''}`}
        </button>
      </div>

      <div className="project-index-grid relative h-full">
        {/* Filter Panel */}
        <aside className="project-index-filter min-h-7/10">
          <FilterPanel
            filters={filters}
            onFilterChange={setFilters}
            isMobileOpen={isMobileFilterOpen}
            className="h-[500px]"
          />
        </aside>

        {/* Project Preview - Only show on devices that can hover (not mobile) */}
        {canHover && (
          // No preview slot in the stacked layout; rendering it there adds a stray grid column
          <div className="project-index-preview mt-auto hidden h-48 min-[880px]:block">
            <ProjectPreview project={hoveredProject} />
          </div>
        )}
        <div className="project-index-list">
          <ProjectList
            projects={filteredProjects}
            onProjectHover={handleProjectHover}
            onProjectLeave={handleProjectLeave}
            onProjectClick={handleProjectClick}
            showPinned={filteredProjects.length === projects.length}
          />
        </div>
      </div>
    </section>
  )
}

export default ProjectIndex
