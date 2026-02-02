"use client"

import Link from "next/link"
import { signIn } from "next-auth/react"
import { useState, useEffect } from "react"
import MobileNav from "./MobileNav"
import HamburgerButton from "../buttons/HamburgerButton/HamburgerButton"
import ActiveLink from "@/lib/helpers/activeLink/activeLink"
import { Logo } from "../logo/Logo"
import AccountMenu from "@/components/account/AccountMenu/AccountMenu"
import type { Session } from "next-auth"

const NAV_LINKS = [
  { name: "Dining", href: "/dining" },
  { name: "Activities", href: "/activities" },
  { name: "Events", href: "/events" },
  { name: "Lodging", href: "/lodging" },
]

export default function NavClient({ session }: { session: Session | null }) {
  const [mobileOpen, setMobileOpen] = useState(false)

useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("nav-open");
    } else {
      document.body.classList.remove("nav-open");
    }

    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [mobileOpen]);

  return (
    <>
    <header className={`fixed ${mobileOpen ? "nav-open" : ""}`}>
      <div className="container">
        <nav className="site-nav">

          <div className="nav-left">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <div className="nav-center">
            <div className="main-nav flex">
              {NAV_LINKS.map(l => (
                <ActiveLink
                    key={l.href}
                    href={l.href}
                    className="nav-link"
                >
                    {l.name}
                </ActiveLink>
                ))}
            </div>
          </div>

          <div className="nav-right flex items-center">
            {!session ? (
              <button
                className="btn sign-in flex items-center"
                onClick={() => signIn("google")}
              >
                Sign In
              </button>
            ) : (
              <AccountMenu session={session} />
            )}

            <div className="hidden">
              <HamburgerButton
                open={mobileOpen}
                onToggle={() => setMobileOpen(v => !v)}
              />
            </div>
          </div>

        </nav>
      </div>

      
    </header>
    
    <div
        className={`hidden page-overlay ${mobileOpen ? "is-active" : ""}`}
        onClick={() => setMobileOpen(false)}
    />

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  )
}