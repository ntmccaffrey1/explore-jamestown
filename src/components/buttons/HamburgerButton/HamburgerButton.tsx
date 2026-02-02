import "./HamburgerButton.css"

interface Props {
  open: boolean
  onToggle: () => void
}

export default function HamburgerButton({ open, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle menu"
      aria-expanded={open}
      className="hamburger"
    >
      <span className={open ? "open" : ""} />
      <span className={open ? "open" : ""} />
      <span className={open ? "open" : ""} />
    </button>
  )
}