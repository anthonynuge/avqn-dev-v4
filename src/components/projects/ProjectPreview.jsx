import LinkButton from '../ui/LinkButton'
const ProjectPreview = ({ project }) => {
  if (!project) {
    return (
      <div className="flex h-64 items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-fg-subtle mb-2 font-mono text-sm uppercase">SELECT A PROJECT</div>
          <div className="text-fg-subtle font-mono text-xs">
            Choose a project from the list to view details
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="">
      {/* Main Content Grid */}
      <div className="grid grid-cols-5 gap-y-4 md:grid-rows-2">
        {/* Left Column - Project Info */}
        <div className="row-start-2 h-32">
          {/* Project Title */}
          <h1 className="text-accent text-display-1 text-3xl leading-tight font-bold uppercase">
            {project.name}
          </h1>

          {/* Description */}
          <div>
            <p className="text-fg text-sm">{project.description}</p>
          </div>
        </div>

        {/* Right Column - Project Image/Visual */}
        <div className="col-span-full grid grid-cols-subgrid">
          <div className="from-accent/10 to-accent/5 relative col-span-3 col-start-2 h-42 bg-gradient-to-br">
            {project.cover ? (
              <img src={project.cover} alt={project.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="text-accent mb-2 font-bold">{project.name.charAt(0)}</div>
                  <div className="text-fg-subtle font-mono text-xs uppercase">PROJECT PREVIEW</div>
                </div>
              </div>
            )}
          </div>

          <h4 className="text-accent text-display-1 justify-self-end font-mono uppercase md:col-start-5">
            {project.id}
          </h4>
        </div>

        <div className="grid grid-cols-subgrid md:col-span-3 md:col-start-3 md:row-start-2">
          <div>
            <h4 className="text-accent mb-1 font-mono text-sm tracking-wider uppercase">Year</h4>
            <p className="text-fg-subtle font-mono text-xs uppercase">
              {new Date(project.date).getFullYear()}
            </p>
          </div>
          <div>
            <h4 className="text-accent mb-1 font-mono text-sm tracking-wider uppercase">Role</h4>
            <p className="text-fg-subtle font-mono text-xs uppercase">//Frontend Developer</p>
          </div>

          <div className="space-y-1 justify-self-end">
            <div>
              <LinkButton to={`/projects/${project.id}`}>View Project</LinkButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectPreview
