"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

import EventGridCard from "@/components/grid/EventGridCard"
import Modal from "@/components/modals/Modal"
import EventModal from "@/components/modals/EventModal"
import type { EventUI } from "@/types/event"

import { useState } from "react"
import "./GridSwiper.css"

export default function EventsSwiperClient({
  events,
  isLoggedIn,
  onFavoriteToggle,
}: {
  events: EventUI[]
  isLoggedIn: boolean
  onFavoriteToggle?: (id: string, next: boolean) => void
}) {
  const [active, setActive] = useState<EventUI | null>(null)

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
          0: { slidesPerView: 1.2 },
          640: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {events.map(ev => (
          <SwiperSlide key={ev.id} style={{ width: "auto" }}>
            <EventGridCard
              event={ev}
              isLoggedIn={isLoggedIn}
              onClick={() => setActive(ev)}
              onFavoriteToggle={handleFavorite}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {active && (
  <Modal onClose={() => setActive(null)}>
    {(requestClose) => (
      <EventModal
        event={active}
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