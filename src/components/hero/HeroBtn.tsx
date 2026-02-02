"use client"

import "./HeroBtn.css"

interface HeroBtnProps {
  label: string
  onClick?: () => void
}

export default function HeroBtn({
  label,
  onClick,
}: HeroBtnProps) {
  return (
    <div className="hero-btn">
      <button
        className="btn hero-btn"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  )
}