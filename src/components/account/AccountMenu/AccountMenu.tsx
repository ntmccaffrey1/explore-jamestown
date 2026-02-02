"use client"

import { useEffect, useRef, useState } from "react"
import { signOut } from "next-auth/react"
import type { Session } from "next-auth"
import Avatar from "@/components/avatar/Avatar"
import AccountMenuContent from "./AccountMenuContent"
import "./AccountMenu.css"

export default function AccountMenu({ session }: { session: Session }) {
  if (!session?.user) return null

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [])

  return (
    <div className="account-menu" ref={ref}>
      <Avatar onClick={() => setOpen(v => !v)} />

      {open && (
        <div className="account-dropdown">
          <AccountMenuContent
            user={session.user}
            onLogout={() => signOut()}
          />
        </div>
      )}
    </div>
  )
}