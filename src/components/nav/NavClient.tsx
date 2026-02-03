"use client"

import Link from "next/link"
import { signIn } from "next-auth/react"
import HamburgerButton from "../buttons/HamburgerButton/HamburgerButton"
import MainNav from "./main/MainNav"
import { Logo } from "../logo/Logo"
import AccountMenu from "@/components/account/AccountMenu/AccountMenu"
import { useMobileNav } from "./mobile/MobileNavClient"
import type { Session } from "next-auth"

export default function NavClient({ session }: { session: Session | null }) {
  const { open, toggleNav } = useMobileNav()

  return (
    <nav className={`site-nav ${open ? "nav-open" : ""}`}>
      <div className="nav-left">
        <Link href="/">
          <Logo />
        </Link>
      </div>

      <div className="nav-center">
        <MainNav />
      </div>

      <div className="nav-right flex items-center">
        {!session ? (
          <button className="btn sign-in" onClick={() => signIn("google")}>
            Sign In
          </button>
        ) : (
          <AccountMenu session={session} />
        )}

        <HamburgerButton open={open} onToggle={toggleNav} />
      </div>
    </nav>
  )
}