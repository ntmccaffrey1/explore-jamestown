import { auth } from "@/lib/auth"
import Avatar from "@/components/avatar/Avatar"
import "./ProfileInfo.css"

export default async function ProfileInfo() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return <div>Please sign in.</div>
  }

  return (
    <div className="profile-info">
      <div className="">
        <Avatar />
      </div>
      <div>
        <h3 className="name">{session.user.name}</h3>
        <p className="email">{session.user.email}</p>
    </div>
  </div>
  )
}