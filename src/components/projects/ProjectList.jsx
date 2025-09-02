import { useState } from 'react'

const ProjectList = ({ projects, onProjectSelect, selectedProject }) => {
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  const sortedProjects = [...projects].sort((a, b) => {
    let aVal, bVal

    switch (sortBy) {
      case 'date':
        aVal = new Date(a.date)
        bVal = new Date(b.date)
        break
      case 'name':
        aVal = a.name.toLowerCase()
        bVal = b.name.toLowerCase()
        break
      case 'type':
        aVal = a.type.toLowerCase()
        bVal = b.type.toLowerCase()
        break
      default:
        return 0
    }

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const getSortIcon = (field) => {
    if (sortBy !== field) return '↕'
    return sortOrder === 'asc' ? '↑' : '↓'
  }

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
          <div className="sticky top-0 border-b">
            <div className="text-accent/80 grid grid-cols-12 gap-4 p-2 font-mono text-xs tracking-wider uppercase">
              <button
                onClick={() => handleSort('date')}
                className="hover:text-accent col-span-1 flex items-center gap-1 transition-colors"
              >
                DATE {getSortIcon('date')}
              </button>
              <button
                onClick={() => handleSort('name')}
                className="hover:text-accent col-span-3 flex items-center gap-1 transition-colors"
              >
                PROJECT NAME {getSortIcon('name')}
              </button>
              <button
                onClick={() => handleSort('type')}
                className="hover:text-accent col-span-2 flex items-center gap-1 transition-colors"
              >
                TYPE {getSortIcon('type')}
              </button>
              <div className="col-span-2 text-center">TECH STACK</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-accent/10 divide-y">
            {sortedProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onProjectSelect(project)}
                className={`project-list-item grid cursor-pointer grid-cols-12 gap-2 p-1 transition-all duration-200 ${
                  selectedProject?.id === project.id ? 'selected bg-accent/10 border-accent' : ''
                }`}
              >
                {/* Date */}
                <div className="col-span-1 flex items-center">
                  <span className="">{new Date(project.date).toLocaleDateString('en-CA')}</span>
                </div>

                {/* Project Name */}
                <div className="col-span-3 flex items-center">
                  <span className="text-sm">// {project.name}</span>
                </div>

                {/* Type */}
                <div className="col-span-1 flex items-center">
                  <span className="">{project.type}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {projects.length === 0 && (
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
}

export default ProjectList
