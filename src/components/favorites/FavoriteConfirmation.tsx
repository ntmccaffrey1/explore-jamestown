"use client"

import { useEffect } from "react"
import { createPortal } from "react-dom"
import "./FavoriteConfirmation.css"

type Mode = "added" | "removed"

export default function FavoriteConfirmModal({
  open,
  title,
  image,
  mode,
  onClose,
}: {
  open: boolean
  title: string
  image?: string | null
  mode: Mode
  onClose: () => void
}) {
  useEffect(() => {
    if (!open) return
    const t = setTimeout(onClose, 2500)
    return () => clearTimeout(t)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fav-confirm-overlay">
      <div className={`fav-confirm ${mode}`}>
        {image && (
          <img
            src={image}
            alt={title}
            className="fav-confirm-img"
          />
        )}
        <div className="fav-confirm-text">
          <p className="fav-title">{title}</p>
          <p className="fav-p">
            {mode === "added"
              ? "added to favorites"
              : "removed from favorites"}
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}