import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import FilterPanel from '../../components/projects/FilterPanel'
import ProjectList from '../../components/projects/ProjectList'
import ProjectPreview from '../../components/projects/ProjectPreview'
import { projects, initialFilters } from '../../data/projects'
import { useGSAP, gsap } from '../../lib/gsapSetup'

const ProjectIndex = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState(initialFilters)
  const [hoveredProject, setHoveredProject] = useState(null)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const hoverTimeoutRef = useRef(null)
  const ref = useRef(null)

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

  // Filter projects based on selected technologies
  const filteredProjects = useMemo(() => {
    const activeFilters = []
    // Collect all active filter technologies
    Object.values(filters).forEach((category) => {
      Object.entries(category).forEach(([tech, isActive]) => {
        if (isActive) {
          activeFilters.push(tech)
        }
      })
    })

    // If no filters are active, show all projects
    if (activeFilters.length === 0) {
      return projects
    }

    // Filter projects that contain any of the active technologies
    return projects.filter((project) => {
      // Flatten all technologies from techStack into a single array
      const allTechnologies = [
        ...(project.techStack.frontend || []),
        ...(project.techStack.backend || []),
        ...(project.techStack.tools || []),
      ]

      // Check if any active filter matches any technology in the project
      return activeFilters.some((tech) =>
        allTechnologies.some(
          (projectTech) =>
            projectTech.toLowerCase().includes(tech.toLowerCase()) ||
            tech.toLowerCase().includes(projectTech.toLowerCase()),
        ),
      )
    })
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
      <h1 className="text-accent text-display-1 font-mono text-4xl leading-tight font-bold uppercase">
        Archive
      </h1>
      {/* Main Layout */}
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

        {/* Project Preview */}
        <div className="project-index-preview mt-auto h-48">
          <ProjectPreview project={hoveredProject} />
        </div>
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
