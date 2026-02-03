/* eslint-disable @next/next/no-img-element */
"use client"

import "./PlaceModal.css"
import FavoriteButton from "../buttons/FavoriteButton/FavoriteButton"
import SocialIcon from "../socials/SocialIcons"
import { SOCIAL_ICONS } from "../socials/SocialIcons"
import type { PlaceUI } from "@/types/place"
import { XIcon } from "../icons/XIcon/XIcon"


interface PlaceModalProps {
  place: PlaceUI
  isLoggedIn: boolean
  onClose: () => void
  onFavoriteToggle: (id: string, next: boolean) => void
}

export default function PlaceModal({
  place,
  isLoggedIn,
  onClose,
  onFavoriteToggle,
}: PlaceModalProps) {

  const amenities = place.amenities ?? [];

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
          placeId={place.id}
          title={place.name}
          image={place.image}
          isLoggedIn={isLoggedIn}
          active={!!place.isFavorited}
          onToggle={(next) => onFavoriteToggle(place.id, next)}
        />
        {place.image && <img src={place.image} alt={place.name} />}
      </div>

      <div className="modal-content--wrapper">
        <h3>{place.name}</h3>
        <div className="modal-links">
          <div className="modal-links-inner">
            {place.email && (
              <a
                className="btn"
                href={`mailto:${place.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Email
              </a>
            )}
            {place.menu && (
                <a
                  className="btn"
                  href={place.menu}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Menu
                </a>
            )}
          </div>
          <div className="modal-socials">
            {place.socials &&
              Object.entries(place.socials).map(([platform, url]) => {
                if (!url) return null
                if (!(platform in SOCIAL_ICONS)) return null

                return (
                  <SocialIcon
                    key={platform}
                    platform={platform as keyof typeof SOCIAL_ICONS}
                    url={url}
                  />
                )
              })}
          </div>
        </div>

        {place.description && <p>{place.description}</p>}

        {place.address && <p>{place.address}</p>}

        {place.phone && <p>{place.phone}</p>}

        {amenities.length > 0 && (
          <ul className="amenities">
            {amenities.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}

        
      </div>
    </div>
    <div className="bottom-url">
        {place.website && (
            <a
              className="btn website"
              href={place.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website
            </a>
        )}
        </div>
     </>   
  )
}