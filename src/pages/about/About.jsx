import HeadModel from '@/components/model/HeadModel'
import LinkButton from '@/components/shared/LinkButton'
import ArrowRight from '@/assets/ArrowRight'

const About = () => {
  return (
    <div className="fill-offset relative grid grid-cols-2">
      <div className="absolute top-1/2 left-1/4 mx-auto h-full w-[75vw] -translate-x-1/2 -translate-y-1/2">
        <HeadModel />
      </div>
      <div className="col-start-2 max-w-[70ch] space-y-4">
        <p className="">
          I&apos;m Anthony, a software engineer based in Houston, Texas with a focus on building
          technology that is both functional and enjoyable to use. Commited to craftsmenship in
          every project I work on.
        </p>
        <p className="">
          I’m highly adaptable, comfortable working on both front-end and back-end development.
          Depending on the project, I can design interfaces, set up infrastructure, and build out
          features. From crafting animations to configuring systems, I’m not afraid to pick up new
          skills and technologies to meet the needs of each project.
        </p>
        <p>When I'm not coding, I enjoy reading, watching anime, and playing games.</p>

        <div className="grid grid-cols-2">
          <div className="">
            <h3 className="text-accent">Education</h3>
            <div className="mb-2">
              <div className="flex justify-between text-sm">
                <div className="text-sm">Western Governors University</div>
              </div>
              <p className="text-sm">B.S Computer Science</p>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <div className="text-sm">University of Houston</div>
              </div>
              <p className="text-sm">B.S Kinsiology</p>
            </div>
          </div>

          <div className="space-y-2 font-mono text-xs uppercase">
            <div className="hover:bg-accent hover:text-bg group inline-flex w-full items-center justify-between px-1">
              <a href="/resume.pdf" download className="">
                Resume
              </a>
              <ArrowRight className="inline-block size-3 transition-transform duration-300 group-hover:-rotate-45"></ArrowRight>
            </div>

            <LinkButton to="https://github.com/anthonynuge">
              <span data-in="scramble" data-out="scramble" data-text="GitHub">
                GitHub
              </span>
            </LinkButton>
            <LinkButton to="https://www.linkedin.com/in/anthony-nguyen-02861b331/">
              <span data-in="scramble" data-out="scramble" data-text="LinkedIn">
                LinkedIn
              </span>
            </LinkButton>
            <LinkButton to="https://www.instagram.com/anthrnee/">
              <span data-in="scramble" data-out="scramble" data-text="Instagram">
                Instagram
              </span>
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
