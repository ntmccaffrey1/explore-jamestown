import HeroImage from "./HeroImage"
import HeroBtn from "./HeroBtn"
import "./Hero.css"

interface HeroProps {
  title: string
  description?: React.ReactNode
  imageSrc: string
  imageAlt?: string
  ctaLabel?: string
  onCtaClick?: () => void
}

export default function Hero({
  title,
  description,
  imageSrc,
  imageAlt = "",
  ctaLabel,
  onCtaClick,
}: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="container">
          <div className="hero-container">
            <div className="hero-content">
              <h1>{title}</h1>

              {description && (
                <p>{description}</p>
              )}
            </div>

            {ctaLabel && (
              <HeroBtn
                label={ctaLabel}
                onClick={onCtaClick}
              />
            )}
          </div>
        </div>
      </div>

      <HeroImage
        src={imageSrc}
        alt={imageAlt}
      />
    </section>
  )
}