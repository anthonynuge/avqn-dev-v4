import { useState, useMemo } from 'react'
import FilterPanel from '../../components/projects/FilterPanel'
import ProjectList from '../../components/projects/ProjectList'
import ProjectPreview from '../../components/projects/ProjectPreview'
import { sampleProjects, initialFilters } from '../../data/projects'

const ProjectIndex = () => {
  const [filters, setFilters] = useState(initialFilters)
  const [selectedProject, setSelectedProject] = useState(sampleProjects[0] || null)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

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
      return sampleProjects
    }

    // Filter projects that contain any of the active technologies
    return sampleProjects.filter((project) =>
      activeFilters.some((tech) => project.technologies.includes(tech)),
    )
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

  const handleProjectSelect = (project) => {
    setSelectedProject(project)
    // Close mobile filter when project is selected
    setIsMobileFilterOpen(false)
  }

  const handleClosePreview = () => {
    setSelectedProject(null)
  }

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen)
  }

  return (
    <section className="inner fill-offset h-screen py-10">
      {/* Mobile Filter Toggle */}
      <div className="border-accent/20 border-b p-4 md:hidden">
        <button
          onClick={toggleMobileFilter}
          className="text-accent hover:text-accent/80 font-mono text-sm tracking-wider uppercase transition-colors"
        >
          {isMobileFilterOpen ? 'CLOSE FILTER' : 'OPEN FILTER'}
        </button>
      </div>

      {/* Main Layout */}
      <div className="fill-offset grid-12 md:grid-rows-4">
        {/* Filter Panel */}
        <div className="flex-shrink-0 md:col-span-3 md:col-start-10 md:row-span-3">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            isMobileOpen={isMobileFilterOpen}
            onMobileToggle={toggleMobileFilter}
          />
        </div>

        {/* Project Preview */}
        <div className="md:col-span-8 md:row-span-2 md:row-start-1">
          <ProjectPreview project={selectedProject} />
        </div>

        {/* Project List */}
        <div className="min-w-0 md:col-span-8 md:row-span-2 md:row-start-3">
          <ProjectList
            projects={filteredProjects}
            onProjectSelect={handleProjectSelect}
            selectedProject={selectedProject}
          />
        </div>
      </div>

      {/* Mobile Project Preview Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="flex h-full flex-col">
            <div className="border-accent/20 border-b p-4">
              <button
                onClick={handleClosePreview}
                className="text-accent hover:text-accent/80 font-mono text-sm tracking-wider uppercase transition-colors"
              >
                CLOSE PREVIEW
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <ProjectPreview project={selectedProject} />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProjectIndex
