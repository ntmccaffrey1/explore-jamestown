"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import FavoriteItem from "./FavoriteItem"
import Modal from "@/components/modals/Modal"
import PlaceModal from "@/components/modals/PlaceModal"
import EventModal from "@/components/modals/EventModal"
import type { FavoriteItemUI } from "@/types/favorite"

export default function FavoritesClient({
  favorites: initialFavorites,
}: {
  favorites: FavoriteItemUI[]
}) {
  const [favorites, setFavorites] = useState(initialFavorites)
  const [active, setActive] = useState<FavoriteItemUI | null>(null)
  const router = useRouter()

  async function removeFavorite(item: FavoriteItemUI) {
    await fetch("/api/favorites/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:
        item.type === "place"
          ? JSON.stringify({ placeId: item.data.id })
          : JSON.stringify({ eventId: item.data.id }),
    })

    setFavorites(prev =>
      prev.filter(f => f.data.id !== item.data.id)
    )

    setActive(prev =>
      prev && prev.data.id === item.data.id ? null : prev
    )

    router.refresh()
  }

  function handleFavoriteToggle(id: string, next: boolean) {
    if (!next) {
      setFavorites(prev =>
        prev.filter(f => f.data.id !== id)
      )
    }

    setActive(prev => {
      if (!prev || prev.data.id !== id) return prev

      return {
        ...prev,
        data: {
          ...prev.data,
          isFavorited: next,
        },
      } as FavoriteItemUI
    })

    router.refresh()
  }

  return (
    <>
      {favorites.map(item => (
        <FavoriteItem
          key={`${item.type}-${item.data.id}`}
          item={item}
          onClick={() => setActive(item)}
          onRemove={() => removeFavorite(item)}
        />
      ))}

      {active && (
        <Modal onClose={() => setActive(null)}>
          {(requestClose) =>
            active.type === "place" ? (
              <PlaceModal
                place={active.data}
                isLoggedIn={true}
                onClose={requestClose}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ) : (
              <EventModal
                event={active.data}
                isLoggedIn={true}
                onClose={requestClose}
                onFavoriteToggle={handleFavoriteToggle}
              />
            )
          }
        </Modal>
      )}
    </>
  )
}