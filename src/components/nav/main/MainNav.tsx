"use client"

import ActiveLink from "@/lib/helpers/activeLink/activeLink"
import "./MainNav.css"

const NAV_LINKS = [
  { label: "Dining", href: "/dining" },
  { label: "Activities", href: "/activities" },
  { label: "Events", href: "/events" },
  { label: "Lodging", href: "/lodging" },
]

interface Props {
  className?: string
  onNavigate?: () => void
}

export default function MainNav({ className = "", onNavigate }: Props) {
  return (
    <div className={`main-nav flex ${className}`}>
      {NAV_LINKS.map(link => (
        <ActiveLink
          key={link.href}
          href={link.href}
          className="nav-link"
          onClick={onNavigate}
        >
          {link.label}
        </ActiveLink>
      ))}
    </div>
  )
}