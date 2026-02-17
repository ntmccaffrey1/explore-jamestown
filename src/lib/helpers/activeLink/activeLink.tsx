"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface Props {
  href: string
  children: React.ReactNode
  className?: string
  activeClassName?: string
  onClick?: () => void
}

export default function ActiveLink({
  href,
  children,
  className = "",
  activeClassName = "is-active",
}: Props) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? activeClassName : ""}`}
    >
      {children}
    </Link>
  )
}