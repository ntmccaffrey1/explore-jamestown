"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { signIn } from "next-auth/react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import AccountMenuContent from "@/components/account/AccountMenu/AccountMenuContent"
import "./MobileNav.css"

interface Props {
  open: boolean
  onClose: () => void
}

export default function MobileNav({ open, onClose }: Props) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  // animate in AFTER mount
  useEffect(() => {
    if (!open) return

    const id = requestAnimationFrame(() => {
      setVisible(true)
    })

    return () => cancelAnimationFrame(id)
  }, [open])

  // animate out
  useEffect(() => {
    if (!open) {
      setVisible(false)
    }
  }, [open])

  // close on route change
  useEffect(() => {
    if (open) onClose()
  }, [pathname])

  return (
    <div className={`mobile-nav-overlay ${visible ? "is-open" : ""}`}>
      <div className="mobile-nav-panel">
        <div className="container">
          <div className="mobile-nav-menu">
            <Link href="/lodging">Lodging</Link>
            <Link href="/dining">Dining</Link>
            <Link href="/activities">Activities</Link>
            <Link href="/events">Events</Link>
          </div>

          {session?.user ? (
            <AccountMenuContent
              user={session.user}
              onNavigate={onClose}
              onLogout={() => signOut({ callbackUrl: "/" })}
            />
          ) : (
            <button
              className="btn"
              onClick={() => signIn("google")}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  )
}