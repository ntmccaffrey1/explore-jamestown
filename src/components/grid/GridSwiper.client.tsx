"use client"

import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

import GridCard from "@/components/grid/GridCard"
import Modal from "@/components/modals/Modal"
import PlaceModal from "@/components/modals/PlaceModal"
import type { PlaceUI } from "@/types/place"
import "./GridSwiper.css"

export default function PlacesSwiperClient({
  places,
  isLoggedIn,
  onFavoriteToggle,
}: {
  places: PlaceUI[]
  isLoggedIn: boolean
  onFavoriteToggle?: (id: string, next: boolean) => void
}) {
  const [active, setActive] = useState<PlaceUI | null>(null)

  function handleFavorite(id: string, next: boolean) {
    onFavoriteToggle?.(id, next)
    setActive(prev =>
      prev && prev.id === id ? { ...prev, isFavorited: next } : prev
    )
  }

  return (
    <>
      <Swiper
        spaceBetween={24}
        slidesPerView="auto"
        grabCursor
        observer
        observeParents
        breakpoints={{
          0: { slidesPerView: 1.05, spaceBetween: 12 },
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {places.map(place => (
          <SwiperSlide key={place.id} style={{ width: "auto" }}>
            <GridCard
              place={place}
              isLoggedIn={isLoggedIn}
              onClick={() => setActive(place)}
              onFavoriteToggle={handleFavorite}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {active && (
        <Modal onClose={() => setActive(null)}>
          {(requestClose) => (
            <PlaceModal
              place={active}
              isLoggedIn={isLoggedIn}
              onClose={requestClose}
              onFavoriteToggle={handleFavorite}
            />
          )}
        </Modal>
      )}
    </>
  )
}