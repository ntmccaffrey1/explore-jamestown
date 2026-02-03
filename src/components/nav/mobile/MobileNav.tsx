"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { signIn } from "next-auth/react"
import { useEffect, useState, useRef } from "react"
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
  const prevPath = useRef(pathname)
  const [visible, setVisible] = useState(false)

  // animate in / out
  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(id)
    } else {
      setVisible(false)
    }
  }, [open])

  // close ONLY when the route actually changes
  useEffect(() => {
    if (open && prevPath.current !== pathname) {
      onClose()
    }
    prevPath.current = pathname
  }, [pathname, open, onClose])

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
              // navigation inside account menu should also wait for route change
              onNavigate={() => {}}
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