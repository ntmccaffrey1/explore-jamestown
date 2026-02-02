"use client"

import dynamic from "next/dynamic"
import type { EventUI } from "@/types/event"

const EventsSwiperClient = dynamic(
  () => import("./EventsSwiper.client"),
  { ssr: false }
)

export default function EventsSwiperWrapper({
  events,
  isLoggedIn,
  onFavoriteToggle,
}: {
  events: EventUI[]
  isLoggedIn: boolean
  onFavoriteToggle?: (id: string, next: boolean) => void
}) {
  return (
    <EventsSwiperClient
      events={events}
      isLoggedIn={isLoggedIn}
      onFavoriteToggle={onFavoriteToggle}
    />
  )
}