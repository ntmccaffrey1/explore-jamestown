import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import FavoritesClient from "@/components/favorites/FavoritesClient"
import ProfileInfo from "@/components/account/ProfileInfo/ProfileInfo"
import type { FavoriteItemUI } from "@/types/favorite"

export default async function AccountPage() {
  const session = await auth()

  if (!session?.user?.id) {
    return <div>Please sign in.</div>
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: {
      place: true,
      event: true,
    },
    orderBy: { createdAt: "desc" },
  })

  const favoriteItems: FavoriteItemUI[] = favorites
    .map((f: any) => {
      if (f.place) {
        return {
          type: "place",
          data: { ...f.place, isFavorited: true },
        }
      }
      if (f.event) {
        return {
          type: "event",
          data: { ...f.event, isFavorited: true },
        }
      }
      return null
    })
    .filter(Boolean) as FavoriteItemUI[]

  return (
    <div className="container">
      <div className="container-wrapper">
        <ProfileInfo />
        <h3>Your Favorites</h3>
        <div className="list_grid">
          <FavoritesClient favorites={favoriteItems} />
        </div>
      </div>
    </div>
  )
}