"use client"

import React, { useEffect, useState } from "react"
import "./FavoriteButton.css"
import { HeartIcon } from "../../icons/HeartIcon/HeartIcon"
import { useRouter } from "next/navigation"
import LoginPromptModal from "../../modals/LoginPromptModal"
import FavoriteConfirmModal from "@/components/favorites/FavoriteConfirmation"

type FavoriteButtonProps = {
  placeId?: string
  eventId?: string
  title: string
  image?: string | null
  active?: boolean
  isLoggedIn: boolean
  onToggle?: (next: boolean) => void
}

export default function FavoriteButton({
  placeId,
  eventId,
  title,
  image,
  active = false,
  isLoggedIn,
  onToggle,
}: FavoriteButtonProps) {
  const [fav, setFav] = useState(active)
  const [confirmMode, setConfirmMode] = useState<"added" | "removed">("added")
  const [loading, setLoading] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  if ((placeId && eventId) || (!placeId && !eventId)) {
    throw new Error(
      "FavoriteButton requires exactly one of placeId or eventId"
    )
  }

  useEffect(() => {
    setFav(active)
  }, [active])

  async function toggle(e: React.MouseEvent) {
    e.stopPropagation()

    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }

    if (loading) return

    const optimistic = !fav
    setFav(optimistic)
    setLoading(true)

    try {
      const res = await fetch("/api/favorites/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          placeId ? { placeId } : { eventId }
        ),
      })

      if (!res.ok) throw new Error("Failed")

      const data = await res.json()

      setFav(data.favorited)
      onToggle?.(data.favorited)

      setConfirmMode(data.favorited ? "added" : "removed")
      setShowConfirm(true)

      router.refresh()
    } catch {
      setFav(!optimistic)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        className={`favorite-btn ${fav ? "is-active" : ""}`}
        onClick={toggle}
        aria-label="Toggle favorite"
      >
        <HeartIcon />
      </button>

      <LoginPromptModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      <FavoriteConfirmModal
        open={showConfirm}
        title={title}
        image={image}
        mode={confirmMode}
        onClose={() => setShowConfirm(false)}
      />
    </>
  )
}