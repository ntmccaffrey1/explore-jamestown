import Link from "next/link"
import Avatar from "@/components/avatar/Avatar"
import { HeartIcon } from "../../icons/HeartIcon/HeartIcon"
import { LogoutIcon } from "../../icons/LogoutIcon/LogoutIcon"

interface Props {
  user: {
    name?: string | null
    email?: string | null
  }
  onLogout?: () => void
  onNavigate?: () => void
}

export default function AccountMenuContent({ user, onLogout, onNavigate }: Props) {
  return (
    <div className="account-menu-content">
      <div className="account-header">
        <div className="avatar-sm">
          <Avatar />
        </div>
        <div>
          <div className="name">{user.name}</div>
          <div className="email">{user.email}</div>
        </div>
      </div>

      <div className="account-items">
        <Link href="/account" className="btn" onClick={onNavigate}>
            <HeartIcon /> Favorites
        </Link>
        <button
          className="btn logout"
          onClick={() => {
            onNavigate?.()
            onLogout?.()
          }}
        >
          <LogoutIcon /> Log out
        </button>
      </div>
    </div>
  )
}