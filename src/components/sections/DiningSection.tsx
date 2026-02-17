import PlacesSection from "./PlacesSection"

interface DiningSectionProps {
  isLoggedIn: boolean
  className?: string
}

export default function DiningSection({
  isLoggedIn,
  className,
}: DiningSectionProps) {
  return (
    <PlacesSection
      title="Dining"
      endpoint="dining"
      isLoggedIn={isLoggedIn}
      className={className}
    />
  )
}