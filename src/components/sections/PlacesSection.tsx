import PlacesSwiperWrapper from "@/components/grid/GridSwiper"
import fetchPlaces from "@/lib/helpers/places/fetchPlaces"
import SectionWrapper from "./SectionWrapper"

interface Props {
  title: string
  endpoint: string
  isLoggedIn: boolean
  className?: string
}

export default async function PlacesSection({
  title,
  endpoint,
  isLoggedIn,
  className
}: Props) {
  const places = await fetchPlaces(endpoint)
  if (!places.length) return null

  return (
    <SectionWrapper title={title} className={className}>
      <PlacesSwiperWrapper
        places={places}
        isLoggedIn={isLoggedIn}
      />
    </SectionWrapper>
  )
}