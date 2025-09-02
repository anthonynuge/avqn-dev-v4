import { useState } from 'react'

const FilterPanel = ({ filters, onFilterChange, isMobileOpen, onMobileToggle }) => {
  const [expandedFolders, setExpandedFolders] = useState({
    frontend: true,
    backend: true,
    tools: true,
  })

  const toggleFolder = (folder) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folder]: !prev[folder],
    }))
  }

  const handleTechToggle = (category, tech) => {
    onFilterChange(category, tech)
  }

  const clearAllFilters = () => {
    onFilterChange('clear')
  }

  return (
    <div
      className={`project-scrollbar h-full overflow-y-auto backdrop-blur-sm ${
        isMobileOpen ? 'block' : 'hidden'
      } md:block`}
    >
      {/* Header */}
      <div className="">
        <div className="mb-1 flex items-center justify-between border-b pb-1">
          <h2 className="text-accent font-mono text-sm uppercase">// FILTER </h2>
          <button
            onClick={clearAllFilters}
            className="text-accent/70 hover:text-accent font-mono text-xs tracking-wider uppercase transition-colors"
          >
            // CLEAR FILTERS
          </button>
        </div>

        {/* Mobile close button */}
        <button
          onClick={onMobileToggle}
          className="text-accent/70 hover:text-accent mb-4 font-mono text-xs tracking-wider uppercase transition-colors md:hidden"
        >
          CLOSE FILTER
        </button>
      </div>

      {/* Filter Tree */}
      <div className="grid grid-cols-2 space-y-4 p-2">
        {/* Frontend Technologies */}
        <div className="space-y-2">
          <button
            onClick={() => toggleFolder('frontend')}
            className="text-accent hover:text-accent/80 flex w-full items-center gap-2 text-left font-mono text-xs tracking-wider uppercase transition-colors"
          >
            <span
              className={`transform transition-transform ${expandedFolders.frontend ? 'rotate-90' : ''}`}
            >
              ▶
            </span>
            <span>FRONTEND</span>
            <span className="text-accent/50">
              ({Object.values(filters.frontend).filter(Boolean).length})
            </span>
          </button>

          {expandedFolders.frontend && (
            <div className="ml-4 space-y-1">
              {Object.entries(filters.frontend).map(([tech, isActive]) => (
                <label key={tech} className="group flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => handleTechToggle('frontend', tech)}
                    className="border-accent/50 checked:bg-accent checked:border-accent relative h-3 w-3 appearance-none border bg-transparent"
                  />
                  <span className="text-fg-subtle group-hover:text-fg font-mono text-xs uppercase transition-colors">
                    {tech}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Backend Technologies */}
        <div className="space-y-2">
          <button
            onClick={() => toggleFolder('backend')}
            className="text-accent hover:text-accent/80 flex w-full items-center gap-2 text-left font-mono text-xs tracking-wider uppercase transition-colors"
          >
            <span
              className={`transform transition-transform ${expandedFolders.backend ? 'rotate-90' : ''}`}
            >
              ▶
            </span>
            <span>BACKEND</span>
            <span className="text-accent/50">
              ({Object.values(filters.backend).filter(Boolean).length})
            </span>
          </button>

          {expandedFolders.backend && (
            <div className="ml-4 space-y-1">
              {Object.entries(filters.backend).map(([tech, isActive]) => (
                <label key={tech} className="group flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => handleTechToggle('backend', tech)}
                    className="border-accent/50 checked:bg-accent checked:border-accent relative h-3 w-3 appearance-none border bg-transparent"
                  />
                  <span className="text-fg-subtle group-hover:text-fg font-mono text-xs uppercase transition-colors">
                    {tech}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Tools */}
        <div className="space-y-2">
          <button
            onClick={() => toggleFolder('tools')}
            className="text-accent hover:text-accent/80 flex w-full items-center gap-2 text-left font-mono text-xs tracking-wider uppercase transition-colors"
          >
            <span
              className={`transform transition-transform ${expandedFolders.tools ? 'rotate-90' : ''}`}
            >
              ▶
            </span>
            <span>TOOLS</span>
            <span className="text-accent/50">
              ({Object.values(filters.tools).filter(Boolean).length})
            </span>
          </button>

          {expandedFolders.tools && (
            <div className="ml-4 space-y-1">
              {Object.entries(filters.tools).map(([tech, isActive]) => (
                <label key={tech} className="group flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => handleTechToggle('tools', tech)}
                    className="border-accent/50 checked:bg-accent checked:border-accent relative h-3 w-3 appearance-none border bg-transparent"
                  />
                  <span className="text-fg-subtle group-hover:text-fg font-mono text-xs uppercase transition-colors">
                    {tech}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
