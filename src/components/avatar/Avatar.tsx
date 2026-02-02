"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import "./Avatar.css"

export default function Avatar({
  onClick,
  size = 100,
}: {
  onClick?: () => void
  size?: number
}) {
  const { data: session } = useSession()

  if (!session?.user) return null

  const { image, name, email } = session.user
  const initial = (name || email || "?")[0].toUpperCase()

  return (
    <button
      className="avatar"
      onClick={onClick}
      aria-label="Account"
    >
      {image ? (
        <Image
          src={image}
          alt={name ?? "User"}
          width={size}
          height={size}
          referrerPolicy="no-referrer"
        />
      ) : (
        <span>{initial}</span>
      )}
    </button>
  )
}