"use client"

import { useEffect } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import "./LoginPromptModal.css"

export default function LoginPromptModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const router = useRouter()

  // Prevent background scroll
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div
      className="login-modal-overlay"
      onClick={(e) => {
        e.stopPropagation()
        onClose()
      }}
      onMouseDown={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div
        className="login-modal"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <h4>Log in</h4>
          <p>Log in to add your favorites to your account.</p>
          <button
                className="btn flex items-center gap-2"
                onClick={() => signIn("google")}
              >
                Sign In
              </button>
      </div>
    </div>,
    document.body
  )
}