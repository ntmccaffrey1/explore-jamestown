"use client"

import { useState, useEffect } from "react"
import GridList from "@/components/grid/GridList"
import GridCard from "@/components/grid/GridCard"
import PlaceModal from "@/components/modals/PlaceModal"
import Modal from "@/components/modals/Modal"
import type { PlaceUI } from "@/types/place"
import "./PlacesClient.css"
import LoadMore from "../buttons/LoadMore/LoadMore"

interface Pagination {
  page: number
  pages: number
  total: number
}

interface PlacesClientProps {
  title: string
  basePath: string
  endpoint: string
  places: PlaceUI[]
  pagination: Pagination
  isLoggedIn: boolean
}

export default function PlacesClient({
  title,
  basePath,
  endpoint,
  places: initialPlaces,
  pagination,
  isLoggedIn,
}: PlacesClientProps) {

  const [places, setPlaces] = useState<PlaceUI[]>(initialPlaces)
  const [active, setActive] = useState<PlaceUI | null>(null)
  const [page, setPage] = useState(pagination.page)
  const [hasMore, setHasMore] = useState(pagination.page < pagination.pages)
  const [loading, setLoading] = useState(false)

  async function loadMore() {
    if (loading || !hasMore) return

    setLoading(true)

    const nextPage = page + 1
    const res = await fetch(`${endpoint}?page=${nextPage}`, {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    })

    if (!res.ok) {
      setLoading(false)
      return
    }

    const { data, pagination: newPagination } = await res.json()

    setPlaces(prev => [...prev, ...data])
    setPage(newPagination.page)
    setHasMore(newPagination.page < newPagination.pages)
    setLoading(false)
  }

  function handleFavoriteToggle(id: string, next: boolean) {
    setPlaces(prev =>
      prev.map(p => (p.id === id ? { ...p, isFavorited: next } : p))
    )

    setActive(prev =>
      prev && prev.id === id ? { ...prev, isFavorited: next } : prev
    )
  }

  return (
    <div className="container">
      <div className="container-wrapper">
      <h1 className="list-title">
        {title}<sup>({pagination.total})</sup>
      </h1>

      <GridList>
        {places.map(p => (
          <GridCard
            key={p.id}
            place={p}
            isLoggedIn={isLoggedIn}
            onClick={() => setActive(p)}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ))}
      </GridList>

      <LoadMore
        hasMore={hasMore}
        loading={loading}
        onLoadMore={loadMore}
      />

      {active && (
        <Modal onClose={() => setActive(null)}>
          {(requestClose) => (
            <PlaceModal
              place={active}
              isLoggedIn={isLoggedIn}
              onClose={requestClose}
              onFavoriteToggle={handleFavoriteToggle}
            />
          )}
        </Modal>
      )}
    </div>
    </div>
  )
}