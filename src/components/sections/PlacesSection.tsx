import PlacesSwiperWrapper from "@/components/grid/GridSwiper"
import fetchPlaces from "@/lib/helpers/places/fetchPlaces"
import SectionWrapper from "./SectionWrapper"

interface Props {
  title: string
  endpoint: string
  isLoggedIn: boolean
}

export default async function PlacesSection({
  title,
  endpoint,
  isLoggedIn,
}: Props) {
  const places = await fetchPlaces(endpoint)
  if (!places.length) return null

  return (
    <SectionWrapper title={title}>
      <PlacesSwiperWrapper
        places={places}
        isLoggedIn={isLoggedIn}
      />
    </SectionWrapper>
  )
}