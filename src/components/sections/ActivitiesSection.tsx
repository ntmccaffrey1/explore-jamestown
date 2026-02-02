import PlacesSection from "./PlacesSection"

export default function ActivitiesSection({
  isLoggedIn,
}: {
  isLoggedIn: boolean
}) {
  return (
    <PlacesSection
      title="Activities"
      endpoint="activities"
      isLoggedIn={isLoggedIn}
    />
  )
}