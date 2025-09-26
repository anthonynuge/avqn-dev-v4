const PROJECTS = [
  {
    title: 'Tryal',
    description: 'Discover, book, and share local experiences. Startup with friends.',
    image: '/projects/project1.jpg',
    link: 'https://tryal.com',
  },
  {
    title: 'MCP Web Scraper',
    description: 'Headless tool that crawls target sites and outputs clean JSON/CSV datasets.',
    image: '/projects/project2.jpg',
    link: 'https://github.com/anthonyvn/mcp-web-scraper',
  },
  {
    title: 'NGX token launch site',
    description: 'Creating NGXs crypto token launch site.',
    image: '/projects/project1.jpg',
    link: 'https://ngx.ai',
  },
]

const PlaygroundSection = () => {
  return (
    <section className="inner fill-offset space-y-4">
      <div>
        <h2 className="text-display-1">Playground</h2>
        <p className="text-caption-1">In the works...</p>
      </div>
      {/* Card Slider */}
      <div className="flex flex-col gap-4 md:flex-row">
        {PROJECTS.map((project) => (
          <div key={project.title} className="text-fg group w-full">
            <div className="bg-accent/50 relative aspect-square overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 transform-gpu object-cover object-center transition-transform duration-300 ease-in-out hover:scale-102"
              />
            </div>
            <h3 className="text-accent">{project.title}</h3>
            <p className="text-caption-2">{project.description}</p>
            <div className="bg-accent/30 relative mt-2 h-px w-full"></div>
            {/* <div className="bg-accent/30 relative mt-2 h-px w-full">
              <span
                aria-hidden
                className="bg-accent absolute top-0 left-0 block h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-focus-within:scale-x-100 group-hover:scale-x-100 motion-reduce:transition-none"
              />
            </div> */}
          </div>
        ))}
      </div>
    </section>
  )
}

export default PlaygroundSection
