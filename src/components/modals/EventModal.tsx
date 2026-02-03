/* eslint-disable @next/next/no-img-element */
"use client"

import "./PlaceModal.css" // reuse styles
import FavoriteButton from "../buttons/FavoriteButton/FavoriteButton"
import type { EventUI } from "@/types/event"
import { XIcon } from "../icons/XIcon/XIcon"

interface EventModalProps {
  event: EventUI
  isLoggedIn: boolean
  onClose: () => void
  onFavoriteToggle: (id: string, next: boolean) => void
}

export default function EventModal({
  event,
  isLoggedIn,
  onClose,
  onFavoriteToggle,
}: EventModalProps) {

  const image = event.images?.[0] ?? null

  return (
    <>
    <div className="place-modal">
      <div className="modal-img--wrapper">
        <button
          type="button"
          className="modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          <XIcon />
        </button>
        <FavoriteButton
            eventId={event.id}
            title={event.title}
            image={image}
            isLoggedIn={isLoggedIn}
            active={!!event.isFavorited}
            onToggle={(next) => onFavoriteToggle(event.id, next)}
        />

        {image && <img src={image} alt={event.title} />}
      </div>

      <div className="modal-content--wrapper">
        <h3>{event.title}</h3>

        {event.startDate && (
          <p>
            {new Date(event.startDate).toLocaleString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        )}

        {event.venue && <p>{event.venue}</p>}

        {event.description && (
            <div
                className="event-description"
                dangerouslySetInnerHTML={{ __html: event.description }}
            />
        )}
      </div>
    </div>
    <div className="bottom-url">
          {event.url && (
              <a
                className="btn"
                href={event.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Event
              </a>
          )}
        </div>
      </>  
  )
}