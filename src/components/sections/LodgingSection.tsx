import PlacesSection from "./PlacesSection"

export default function LodgingSection({
  isLoggedIn,
}: {
  isLoggedIn: boolean
}) {
  return (
    <PlacesSection
      title="Lodging"
      endpoint="lodging"
      isLoggedIn={isLoggedIn}
    />
  )
}