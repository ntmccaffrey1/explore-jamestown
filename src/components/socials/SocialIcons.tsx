import InstagramIcon from "../icons/InstagramIcon/InstagramIcon"
import FacebookIcon from "../icons/FacebookIcon/FacebookIcon"
import "./SocialIcons.css"

export const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
}

interface SocialIconProps {
  platform: keyof typeof SOCIAL_ICONS
  url: string
}

export default function SocialIcon({ platform, url }: SocialIconProps) {
  const Icon = SOCIAL_ICONS[platform]

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={platform}
      className={`social-icon social-${platform}`}
    >
      <Icon className="icon" />
    </a>
  )
}