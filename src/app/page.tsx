import Hero from "@/components/hero/Hero"
import DiningSection from "@/components/sections/DiningSection"
import ActivitiesSection from "@/components/sections/ActivitiesSection"
import LodgingSection from "@/components/sections/LodgingSection"
import EventsSection from "@/components/sections/EventsSection"
import { auth } from "@/lib/auth"

export default async function Home() {
  const session = await auth()
  const isLoggedIn = !!session

  return (
    <div>
      <Hero
        title="Explore Jamestown"
        description={
          <>
            Discover dining, events, and local favorites in Jamestown.
            <br />
            One place to explore what’s happening around town.
          </>
        }
        imageSrc="/images/hero.jpg"
        imageAlt="Explore Jamestown"
        ctaLabel="Explore"
      />

      <DiningSection isLoggedIn={isLoggedIn} />
      <EventsSection />
      <ActivitiesSection isLoggedIn={isLoggedIn} />
      <LodgingSection isLoggedIn={isLoggedIn} />
    </div>
  )
}