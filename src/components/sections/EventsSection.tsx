import fetchPlaces from "@/lib/helpers/places/fetchPlaces"
import EventsSwiperWrapper from "@/components/grid/EventsSwiper"
import SectionWrapper from "./SectionWrapper"
import { auth } from "@/lib/auth"

export default async function EventsSection() {
  const session = await auth()
  const isLoggedIn = !!session

  const events = await fetchPlaces("events", { page: 0, limit: 8 })
  if (!events.length) return null

  return (
    <SectionWrapper title="Events">
      <EventsSwiperWrapper
        events={events}
        isLoggedIn={isLoggedIn}
      />
    </SectionWrapper>
  )
}