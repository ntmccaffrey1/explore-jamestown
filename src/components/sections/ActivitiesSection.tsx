import PlacesSection from "./PlacesSection"

interface ActivitiesSectionProps {
  isLoggedIn: boolean
  className?: string
}

export default function ActivitiesSection({
  isLoggedIn,
  className,
}: ActivitiesSectionProps) {
  return (
    <PlacesSection
      title="Activities"
      endpoint="activities"
      isLoggedIn={isLoggedIn}
      className={className}
    />
  )
}