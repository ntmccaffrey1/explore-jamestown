import PlacesSection from "./PlacesSection"

interface LodgingSectionProps {
  isLoggedIn: boolean
  className?: string
}

export default function LodgingSection({
  isLoggedIn,
  className,
}: LodgingSectionProps) {
  return (
    <PlacesSection
      title="Lodging"
      endpoint="lodging"
      isLoggedIn={isLoggedIn}
      className={className}
    />
  )
}