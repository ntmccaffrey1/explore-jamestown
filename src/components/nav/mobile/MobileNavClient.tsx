"use client"

import { createContext, useContext, useState, useEffect } from "react"

type MobileNavContextType = {
  open: boolean
  openNav: () => void
  closeNav: () => void
  toggleNav: () => void
}

const MobileNavContext = createContext<MobileNavContextType | null>(null)

export default function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle("nav-open", open)
    return () => document.body.classList.remove("nav-open")
  }, [open])

  return (
    <MobileNavContext.Provider
      value={{
        open,
        openNav: () => setOpen(true),
        closeNav: () => setOpen(false),
        toggleNav: () => setOpen(v => !v),
      }}
    >
      {children}
    </MobileNavContext.Provider>
  )
}

export function useMobileNav() {
  const ctx = useContext(MobileNavContext)
  if (!ctx) {
    throw new Error("useMobileNav must be used inside MobileNavProvider")
  }
  return ctx
}