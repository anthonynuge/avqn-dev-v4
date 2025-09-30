import { socials } from '../../data/profile'
import LinkButton from './LinkButton'

const SocialLinks = () => {
  return (
    <>
      <LinkButton to={socials.resume} download>
        <span data-in="scramble" data-out="scramble" data-text="Resume">
          Resume
        </span>
      </LinkButton>
      <LinkButton to={socials.github}>
        <span data-in="scramble" data-out="scramble" data-text="GitHub">
          GitHub
        </span>
      </LinkButton>
      <LinkButton to={socials.linkedin}>
        <span data-in="scramble" data-out="scramble" data-text="LinkedIn">
          LinkedIn
        </span>
      </LinkButton>
    </>
  )
}

export default SocialLinks
