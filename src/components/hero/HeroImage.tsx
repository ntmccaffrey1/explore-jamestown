import "./HeroImage.css"

export default function HeroImage({
  src,
  alt = "",
}: {
  src: string
  alt?: string
}) {
  return (
    <div className="hero-image">
      <img src={src} alt={alt} />
    </div>
  )
}