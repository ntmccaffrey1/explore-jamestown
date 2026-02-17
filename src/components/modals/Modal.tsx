"use client"

import { useEffect, useState, useCallback } from "react"

export default function Modal({
  children,
  onClose,
}: {
  children: (requestClose: () => void) => React.ReactNode
  onClose: () => void
}) {
  const [open, setOpen] = useState(false)

  const requestClose = useCallback(() => {
    setOpen(false)
    setTimeout(onClose, 300)
  }, [onClose])

  // open on mount
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setOpen(true)
    })
    return () => cancelAnimationFrame(id)
  }, [])

  // lock body scroll
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [])

  // ESC key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [requestClose])

  return (
    <div
      className={`modal-overlay ${open ? "open" : "closing"}`}
      onClick={requestClose}
    >
      <div
        className={`modal-body ${open ? "open" : "closing"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children(requestClose)}
      </div>
    </div>
  )
}