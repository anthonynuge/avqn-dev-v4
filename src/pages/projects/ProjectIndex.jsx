import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import FilterPanel from '../../components/projects/FilterPanel'
import ProjectList from '../../components/projects/ProjectList'
import ProjectPreview from '../../components/projects/ProjectPreview'
import { projects, initialFilters } from '../../data/projects'
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

  // Filter projects based on selected technologies and view filters
  const filteredProjects = useMemo(() => {
    let filtered = projects

    // Apply view filters first
    const viewFilters = filters.view
    if (viewFilters.Work || viewFilters.Personal || viewFilters.Live || viewFilters.Repo) {
      filtered = filtered.filter((project) => {
        const matchesOrigin =
          (viewFilters.Work && project.origin === 'work') ||
          (viewFilters.Personal && project.origin === 'personal')

        const matchesStatus =
          (viewFilters.Live && project.status === 'live') ||
          (viewFilters.Repo && project.links && project.links.repo)

        // If no origin filters are active, show all origins
        // If no status filters are active, show all statuses
        const originMatch = !viewFilters.Work && !viewFilters.Personal ? true : matchesOrigin
        const statusMatch = !viewFilters.Live && !viewFilters.Repo ? true : matchesStatus

        return originMatch && statusMatch
      })
    }

    // Apply technology filters
    const techFilters = []
    Object.entries(filters.frontend).forEach(([tech, isActive]) => {
      if (isActive) techFilters.push(tech)
    })
    Object.entries(filters.backend).forEach(([tech, isActive]) => {
      if (isActive) techFilters.push(tech)
    })
    Object.entries(filters.tools).forEach(([tech, isActive]) => {
      if (isActive) techFilters.push(tech)
    })

    if (techFilters.length > 0) {
      filtered = filtered.filter((project) => {
        // Flatten all technologies from tech into a single array
        const allTechnologies = [
          ...(project.tech.frontend || []),
          ...(project.tech.backend || []),
          ...(project.tech.tools || []),
        ]

        // Check if any active filter matches any technology in the project
        return techFilters.some((tech) =>
          allTechnologies.some(
            (projectTech) =>
              projectTech.toLowerCase().includes(tech.toLowerCase()) ||
              tech.toLowerCase().includes(projectTech.toLowerCase()),
          ),
        )
      })
    }

    return filtered
  }, [filters])

  const handleFilterChange = (category, tech) => {
    if (category === 'clear') {
      setFilters(initialFilters)
      return
    }

    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [tech]: !prev[category][tech],
      },
    }))
  }

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
            onFilterChange={handleFilterChange}
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
          />
        </div>
      </div>
    </section>
  )
}

export default ProjectIndex
