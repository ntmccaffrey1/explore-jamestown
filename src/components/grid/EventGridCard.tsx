/* eslint-disable @next/next/no-img-element */
"use client"

import "./GridCard.css"
import FavoriteButton from "../buttons/FavoriteButton/FavoriteButton"
import ArrowButton from "../buttons/ArrowButton/ArrowButton"
import type { EventUI } from "@/types/event"
import { stripHtml } from "@/lib/utils/stripHtml"

interface EventGridCardProps {
  event: EventUI
  isLoggedIn: boolean
  onClick?: () => void
  onFavoriteToggle?: (id: string, next: boolean) => void
}

export default function EventGridCard({
  event,
  isLoggedIn,
  onClick,
  onFavoriteToggle,
}: EventGridCardProps) {
  const {
    id,
    title,
    description,
    venue,
    images,
    startDate,
    isFavorited,
  } = event

  const image = images?.[0] ?? null

  const date = startDate ? new Date(startDate) : null
  const month = date?.toLocaleString("en-US", { month: "short" })
  const day = date?.getDate()

  return (
    <div className="list_grid--item" onClick={onClick}>
      <div className="col-1">
        <FavoriteButton
          eventId={id}
          title={title}
          image={image}
          isLoggedIn={isLoggedIn}
          active={!!isFavorited}
          onToggle={(next) => onFavoriteToggle?.(id, next)}
        />

        {month && day && (
          <div className="event-date-badge">
            <span className="month">{month}</span>
            <span className="day">{day}</span>
          </div>
        )}

        <div className="img-wrapper">
          {image && <img src={image} alt={title} />}
        </div>
      </div>

      <div className="card-wrapper">
        <div className="col-2">
          <h4>{title}</h4>
            {description && (
                <p className="description">
                {stripHtml(description)}
                </p>
            )}
        </div>

        <div className="col-3">
          <div className="col-3--info">
            {venue && <p>{venue}</p>}
          </div>

          <div className="col-3--btn">
            <ArrowButton />
          </div>
        </div>
      </div>
    </div>
  )
}