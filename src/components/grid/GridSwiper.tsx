"use client"

import dynamic from "next/dynamic"
import type { PlaceUI } from "@/types/place"

const PlacesSwiper = dynamic(
  () => import("./GridSwiper.client"),
  { ssr: false }
)

export default function PlacesSwiperWrapper({
  places,
  isLoggedIn,
  onFavoriteToggle,
}: {
  places: PlaceUI[]
  isLoggedIn: boolean
  onFavoriteToggle?: (id: string, next: boolean) => void
}) {
  return (
    <PlacesSwiper
      places={places}
      isLoggedIn={isLoggedIn}
      onFavoriteToggle={onFavoriteToggle}
    />
  )
}