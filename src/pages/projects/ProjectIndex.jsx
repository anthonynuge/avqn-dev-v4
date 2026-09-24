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

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen)
  }

  return (
    <section className="inner fill-offset overflow-hidden" ref={ref}>
      <h1 className="project-index-header text-accent text-display-1 font-mono text-4xl leading-tight font-bold uppercase">
        Archive
      </h1>

      <div className="project-index-grid relative h-full">
        {/* Filter Panel */}
        <aside className="project-index-filter min-h-7/10">
          <FilterPanel
            filters={filters}
            onFilterChange={setFilters}
            isMobileOpen={isMobileFilterOpen}
            onMobileToggle={toggleMobileFilter}
            className="h-[500px]"
          />
        </aside>

        {/* Project Preview - Only show on devices that can hover (not mobile) */}
        {canHover && (
          <div className="project-index-preview mt-auto h-48">
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
