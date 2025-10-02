import { useParams } from 'react-router'
import { useState, useMemo } from 'react'
import { projects } from '../../data/projects'
import LinkButton from '../../components/ui/LinkButton'
import CarouselView from '../../components/CarouselView'

const ProjectDetail = () => {
  const { projectSlug } = useParams()
  const [index, setIndex] = useState(0)

  // Find the project by slug
  const project = projects.find((p) => p.slug === projectSlug)

  // Stable reference for images
  const images = useMemo(() => project.demos.filter(Boolean) ?? [], [project?.demos])

  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length)
  const next = () => setIndex((prev) => (prev + 1) % images.length)

  if (!project) {
    return (
      <div className="inner fill-offset py-10">
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
      <div className="inner grid-12 relative min-h-[60vh] md:min-h-[60vh] md:py-24">
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
              <ul className="col-span-full col-start-4 self-end">
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
            {project.links.live && (
              <LinkButton to={project.links.live} external className="w-full md:h-8">
                View Live Site
              </LinkButton>
            )}
            {project.links.repo && (
              <LinkButton to={project.links.repo} external className="w-full md:h-8">
                View Code
              </LinkButton>
            )}
          </div>
        </div>

        <h3 className="text-accent inner text-fluid-subheading-1 absolute bottom-0 left-0 z-10 translate-y-1/2 font-bold uppercase">
          {project.id}
        </h3>
      </div>

      <div className="relative flex-1">
        {/* Carosuel Container */}
        <CarouselView images={images} shift={-200} index={index} backdrop={project.backdrop.url} />

        {/* Carousel Controls */}
        <div className="absolute -top-0 right-0 z-50 flex h-[80px] -translate-x-1/2 translate-y-1/2 flex-col items-center justify-around gap-2 md:-top-14 md:w-[200px] md:-translate-y-0 md:flex-row md:gap-4">
          <button onClick={prev} className="text-caption-2 text-accent cursor-pointer">
            Prev
          </button>
          {images.map((_, i) => (
            <span
              key={i}
              className={`${index === i ? 'bg-accent h-5 w-1' : 'bg-accent/50 h-1 w-1 flex-shrink'} transition-all duration-400 ease-in-out`}
            />
          ))}
          <button onClick={next} className="text-caption-2 text-accent cursor-pointer">
            Next
          </button>
        </div>

        {/* Specifications Container */}
        <div className="inner relative">
          <h3 className="text-accent text-fluid-subheading absolute top-0 right-8 z-10 -translate-y-1/2">
            Specifications
          </h3>

          <div className="grid-12 py-14">
            <div className="col-span-full grid grid-cols-subgrid gap-y-4 md:col-[4/12]">
              {Object.entries(project.tech).map(([key, value]) => (
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
