import ShatterImageHover from './ShatterImageHover'
const HeroSection = () => {
  return (
    <section className="inner fill-offset grid-12 relative md:grid-rows-4">
      <div className="col-span-12 place-self-center md:col-span-6 md:row-span-4 md:grid md:grid-cols-subgrid md:grid-rows-subgrid">
        {/* Name and title */}
        <div className="md:col-span-5 md:row-span-2 md:row-start-3 md:self-end">
          <h1 className="text-display-1 md:grid-row-start-3 md:col-span-6 md:row-start-3">
            Anthony Nguyen
          </h1>
          <h2 className="text-display-1 mb-1 md:col-span-4 md:row-start-2">Full-Stack Developer</h2>
        </div>
        {/* Intro text */}
        <p className="text-caption-1 md:col-span-3 md:col-start-2 md:row-start-1">
          Anthony Viet Quoc Nguyen is a creative full-stack developer building interactive websites
          with smooth motion and clean design. Available remotely, based in Houston.
        </p>
      </div>

      <div className="col-span-full md:col-span-6">stuff</div>

      <div className="bg-accent col-span-full aspect-square h-full self-center md:col-span-6 md:col-start-7 md:row-span-2 md:row-start-2 md:aspect-auto md:h-64 md:w-full"></div>

      {/* <div className="mt-auto overflow-hidden">
        <ShatterImageHover src="/images/abstract-bg.jpg" />
      </div> */}
    </section>
  )
}

export default HeroSection
