import { useParams } from 'react-router'
import { sampleProjects } from '../../data/projects'
import LinkButton from '../../components/ui/LinkButton'
import ParallaxImage from '../../components/shared/ParallaxImage'

const ProjectDetail = () => {
  const { projectSlug } = useParams()

  // Find the project by slug
  const project = sampleProjects.find((p) => p.slug === projectSlug)

  if (!project) {
    return (
      <div className="inner fill-offset h-screen py-10">
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <h1 className="text-accent mb-4 text-2xl font-bold uppercase">Project Not Found</h1>
            <p className="text-fg-subtle mb-6">The project you're looking for doesn't exist.</p>
            <LinkButton to="/projects">Back to Projects</LinkButton>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="">
      <div className="inner grid-12 relative min-h-[60dvh] md:min-h-[60dvh] md:py-24">
        <h1 className="text-accent text-fluid-title col-span-5 self-end font-mono font-bold uppercase md:self-start lg:col-start-2">
          {project.name}
        </h1>

        {/* Right Column */}
        <div className="col-span-6 space-y-4 md:col-start-7 md:max-w-2xl">
          <p className="text-xs md:text-sm lg:text-base">{project.description}</p>
          {/* Meta */}
          <div className="grid grid-cols-2 gap-y-2 md:grid-cols-6">
            {/* Features */}
            <div className="col-span-full grid grid-cols-subgrid">
              <div className="text-meta-title">Features</div>
              <ul className="col-span-full col-start-5">
                {project.features.map((feature) => (
                  <li className="text-meta-item" key={feature}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Links */}
          <div className="flex w-full flex-col gap-2">
            {project.liveUrl && (
              <LinkButton to={project.liveUrl} external className="w-full">
                View Live Site
              </LinkButton>
            )}
            {project.githubUrl && (
              <LinkButton to={project.githubUrl} external>
                View Code
              </LinkButton>
            )}
          </div>
        </div>

        <h3 className="text-accent inner text-fluid-subheading-1 absolute bottom-0 left-0 translate-y-1/2 font-bold uppercase">
          {project.id}
        </h3>
      </div>

      <div className="relative flex-1">
        <div className="relative -z-1 h-[60dvh] overflow-hidden md:h-[70dvh]">
          <ParallaxImage
            src={project.cover}
            alt={project.name}
            shift={-300}
            className="h-[200dvh] w-full object-cover"
          />
        </div>
        <div className="inner relative">
          <h3 className="text-accent text-fluid-subheading absolute top-0 right-8 -translate-y-1/2">
            Specifications
          </h3>

          <div className="grid-12 py-12 md:py-24">
            <div className="col-span-full grid grid-cols-subgrid gap-y-4 md:col-[4/12]">
              {Object.entries(project.techStack).map(([key, value]) => (
                <div key={key} className="col-span-2 md:col-span-2">
                  <div className="text-accent font-mono text-sm uppercase">{key}</div>
                  <ul className="text-caption-2 flex flex-col">
                    {value.map((tech) => (
                      <li key={tech} className="text-caption-2">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectDetail
