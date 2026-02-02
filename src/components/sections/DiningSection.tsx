import PlacesSection from "./PlacesSection"

export default function DiningSection({
  isLoggedIn,
}: {
  isLoggedIn: boolean
}) {
  return (
    <PlacesSection
      title="Dining"
      endpoint="dining"
      isLoggedIn={isLoggedIn}
    />
  )
}