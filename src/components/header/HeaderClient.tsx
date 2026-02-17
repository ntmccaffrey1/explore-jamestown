import NavClient from "../nav/NavClient"
import type { Session } from "next-auth"

export default function HeaderClient({ session }: { session: Session | null }) {
  return (
    <header className="site-header fixed" role="banner">
      <div className="container">
        <NavClient session={session} />
      </div>
    </header>
  )
}