"use client"

import { useEffect, useState } from "react"
import MobileNav from "./MobileNav"
import { useMobileNav } from "./MobileNavClient"

export default function MobileNavWrapper() {
  const { open, closeNav } = useMobileNav()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (open) setMounted(true)
  }, [open])

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    if (e.propertyName !== "transform") return

    if (!open) setMounted(false)
  }

  if (!mounted) return null

  return (
    <>
      <div
        className={`page-overlay ${open ? "is-active" : ""}`}
        onClick={open ? closeNav : undefined}
        style={{ pointerEvents: open ? "auto" : "none" }}
      />

      <div onTransitionEnd={handleTransitionEnd}>
        <MobileNav open={open} onClose={closeNav} />
      </div>
    </>
  )
}