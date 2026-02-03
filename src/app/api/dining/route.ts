import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const session = await auth()

    const { searchParams } = new URL(request.url)

    const page = Math.max(Number(searchParams.get("page")) || 1, 1)
    const limit = Math.min(Number(searchParams.get("limit")) || 12, 50)
    const skip = (page - 1) * limit

    const where: any = {
      type: "DINING",
    }

    const [dining, total] = await Promise.all([
      prisma.place.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: "asc" },
        select: {
          id: true,
          slug: true,
          name: true,
          image: true,
          address: true,
          website: true,
          email: true,
          socials: true,
          menu: true,
          description: true,
          amenities: true,
          phone: true,
          city: true,
          updatedAt: true,
        },
      }),
      prisma.place.count({ where }),
    ])

    let favoriteIds = new Set<string>()

    if (session?.user?.id) {
      const favorites = await prisma.favorite.findMany({
        where: { userId: session.user.id },
        select: { placeId: true },
      })

      favorites.forEach((f: any) => {
        if (f.placeId) favoriteIds.add(f.placeId)
      })
    }

    const data = dining.map((place: any) => ({
      ...place,
      isFavorited: favoriteIds.has(place.id),
    }))

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (err) {
    console.error("GET /dining error:", err)
    return NextResponse.json(
      { message: "Failed to fetch dining" },
      { status: 500 }
    )
  }
}