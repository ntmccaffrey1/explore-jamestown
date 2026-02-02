"use client"

import { useState } from "react"
import GridList from "@/components/grid/GridList"
import EventGridCard from "@/components/grid/EventGridCard"
import EventModal from "../modals/EventModal"
import Modal from "@/components/modals/Modal"
import LoadMore from "@/components/buttons/LoadMore/LoadMore"
import type { EventUI } from "@/types/event"
import "./EventsClient.css"

interface Pagination {
  page: number
  pages: number
  total: number
}

interface EventsClientProps {
  title: string
  basePath: string
  endpoint: string
  events: EventUI[]
  pagination: Pagination
  isLoggedIn: boolean
}

export default function EventsClient({
  title,
  basePath,
  endpoint,
  events: initialEvents,
  pagination,
  isLoggedIn,
}: EventsClientProps) {

  const [events, setEvents] = useState<EventUI[]>(initialEvents)
  const [active, setActive] = useState<EventUI | null>(null)
  const [page, setPage] = useState(pagination.page)
  const [hasMore, setHasMore] = useState(pagination.page < pagination.pages)
  const [loading, setLoading] = useState(false)

  async function loadMore() {
    if (loading || !hasMore) return

    setLoading(true)

    const nextPage = page + 1
    const res = await fetch(`${endpoint}?page=${nextPage}&limit=12`, {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    })

    if (!res.ok) {
      setLoading(false)
      return
    }

    const { data, pagination: newPagination } = await res.json()

    setEvents(prev => [...prev, ...data])
    setPage(newPagination.page)
    setHasMore(newPagination.page < newPagination.pages)
    setLoading(false)
  }

  function handleFavoriteToggle(id: string, next: boolean) {
    setEvents(prev =>
      prev.map(e => (e.id === id ? { ...e, isFavorited: next } : e))
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
          {events.map(ev => (
            <EventGridCard
              key={ev.id}
              event={ev}
              isLoggedIn={isLoggedIn}
              onClick={() => setActive(ev)}
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
                <EventModal
                    event={active}
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