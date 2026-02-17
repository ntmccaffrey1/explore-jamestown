/* eslint-disable @next/next/no-img-element */
"use client"

import "./GridCard.css"
import FavoriteButton from "../buttons/FavoriteButton/FavoriteButton"
import ArrowButton from "../buttons/ArrowButton/ArrowButton"
import type { PlaceUI } from "@/types/place"

interface GridCardProps {
  place: PlaceUI
  isLoggedIn: boolean
  onClick?: () => void
  onFavoriteToggle?: (id: string, next: boolean) => void
}

export default function GridCard({
  place,
  isLoggedIn,
  onClick,
  onFavoriteToggle,
}: GridCardProps) {
  const { image, name, description, address, phone } = place

  return (
    <div className="list_grid--item" onClick={onClick}>
      <div className="col-1">
        <FavoriteButton
          placeId={place.id}
          title={place.name}
          image={place.image}
          isLoggedIn={isLoggedIn}
          active={!!place.isFavorited}
          onToggle={(next) => onFavoriteToggle?.(place.id, next)}
        />
        <div className="img-wrapper">
          {image && <img src={image} alt={name} />}
        </div>
      </div>

      <div className="card-wrapper">
        <div className="col-2">
          <h4>{name}</h4>
          {description && (
            <p className="description">{description}</p>
          )}
        </div>

        <div className="col-3">
          <div className="col-3--info">
            {address && <p>{address}</p>}
            {phone && <p>{phone}</p>}
          </div>

          <div className="col-3--btn">
            <ArrowButton />
          </div>
        </div>
      </div>
    </div>
  )
}