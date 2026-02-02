import Link from "next/link"
import "./Footer.css"

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">
          {/* LEFT */}
          <div className="footer-left">
            <nav className="footer-nav">
                <Link href="/lodging">Lodging</Link>
                <Link href="/dining">Dining</Link>
                <Link href="/activities">Activities</Link>
                <Link href="/events">Events</Link>
            </nav>
          </div>

          {/* RIGHT */}
          <p>© {new Date().getFullYear()} Explore Jamestown</p>
        </div>
      </div>
    </footer>
  )
}