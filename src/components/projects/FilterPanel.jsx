import { useState } from 'react'
import { projects } from '../../data/projects'
import {
  capabilities,
  categories,
  hasSkill,
  initialFilters,
  origins,
  skillGroups,
} from '../../data/filters'

// Static counts show how much each skill/category has been used overall
const count = (fn) => projects.filter(fn).length

const Option = ({ label, n, checked, onChange }) => (
  <label className="group flex cursor-pointer items-center gap-2">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="border-accent/50 checked:bg-accent checked:border-accent relative h-3 w-3 shrink-0 appearance-none border bg-transparent"
    />
    <span className="text-fg-subtle group-hover:text-fg font-mono text-xs uppercase transition-colors">
      {label}
      {n != null && <span className="text-accent/50"> ({n})</span>}
    </span>
  </label>
)

// Collapsible folder, same look as the original filter tree
const Group = ({ title, active, gap = 'gap-1', children }) => {
  const [open, setOpen] = useState(true)
  return (
    <div className="space-y-2">
      <button
        onClick={() => setOpen(!open)}
        className={`text-accent hover:text-accent/80 flex w-full items-center ${gap} text-left font-mono text-xs tracking-wider uppercase transition-colors`}
      >
        <span className={`transform transition-transform ${open ? 'rotate-90' : ''}`}>▶</span>
        <span>{title}</span>
        <span className="text-accent/50">({active})</span>
      </button>
      {open && <div className="ml-4 space-y-0.5">{children}</div>}
    </div>
  )
}

const FilterPanel = ({ filters, onFilterChange, isMobileOpen }) => {
  const set = (patch) => onFilterChange((prev) => ({ ...prev, ...patch }))
  // Multi-select lists (capabilities, skills)
  const toggle = (key, v) =>
    onFilterChange((prev) => ({
      ...prev,
      [key]: prev[key].includes(v) ? prev[key].filter((x) => x !== v) : [...prev[key], v],
    }))

  return (
    <div
      className={`project-scrollbar h-full overflow-y-auto backdrop-blur-sm ${
        isMobileOpen ? 'block' : 'hidden'
      } min-[880px]:block`}
    >
      {/* Header */}
      <div className="">
        <div className="mb-1 flex items-center justify-between border-b pb-1">
          <h2 className="text-accent font-mono text-xs uppercase">// FILTER </h2>
          <button
            onClick={() => onFilterChange(initialFilters)}
            className="text-accent/70 hover:text-accent font-mono text-xs tracking-wider uppercase transition-colors"
          >
            // CLEAR FILTERS
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 space-y-4 p-2">
        {/* Left column */}
        <div className="space-y-4">
          <Group title="Focus" active={filters.category ? 1 : 0}>
            {categories.map((c) => (
              <Option
                key={c}
                label={c}
                n={count((p) => p.type === c)}
                checked={filters.category === c}
                onChange={() => set({ category: filters.category === c ? null : c })}
              />
            ))}
          </Group>

          <Group title="Context" active={(filters.origin ? 1 : 0) + (filters.live ? 1 : 0)}>
            {Object.entries(origins).map(([label, origin]) => (
              <Option
                key={label}
                label={label}
                n={count((p) => p.origin === origin)}
                checked={filters.origin === origin}
                onChange={() => set({ origin: filters.origin === origin ? null : origin })}
              />
            ))}
            <Option
              label="Live only"
              n={count((p) => p.status === 'live')}
              checked={filters.live}
              onChange={() => set({ live: !filters.live })}
            />
          </Group>

          <Group title="Capability" active={filters.capabilities.length}>
            {capabilities.map((c) => (
              <Option
                key={c}
                label={c}
                n={count((p) => p.capabilities.includes(c))}
                checked={filters.capabilities.includes(c)}
                onChange={() => toggle('capabilities', c)}
              />
            ))}
          </Group>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <Group title="Skills" active={filters.skills.length} gap="gap-2">
            {Object.entries(skillGroups).map(([group, skills]) => (
              <div key={group} className="space-y-0.5 pt-2 first:pt-0">
                <div className="text-accent font-mono text-[10px] tracking-wider uppercase">
                  {group}
                </div>
                {skills.map((s) => (
                  <Option
                    key={s}
                    label={s}
                    n={count((p) => hasSkill(p, s))}
                    checked={filters.skills.includes(s)}
                    onChange={() => toggle('skills', s)}
                  />
                ))}
              </div>
            ))}
          </Group>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
