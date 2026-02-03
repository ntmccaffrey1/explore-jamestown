import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function GET(req: Request) {
  try {
    const session = await auth()
    const { searchParams } = new URL(req.url)

    const page = Math.max(Number(searchParams.get("page")) || 0, 0)
    const limit = Math.min(Number(searchParams.get("limit")) || 20, 100)
    const skip = page * limit

    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)

    const where: any = {
      approved: true,
      OR: [
        { endDate: { gte: startOfToday } },
        { startDate: { gte: startOfToday } },
      ],
    }

    const category = searchParams.get("category")
    if (category && category !== "all") {
      where.category = category
    }

    const venue = searchParams.get("venue")
    if (venue) {
      where.venue = venue
    }

    const [events, total, favorites] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { startDate: "asc" },
      }),
      prisma.event.count({ where }),
      session?.user?.id
        ? prisma.favorite.findMany({
            where: {
              userId: session.user.id,
              eventId: { not: null },
            },
            select: { eventId: true },
          })
        : Promise.resolve([]),
    ])

    const favoriteIds = new Set(
      favorites.map((f: any) => f.eventId)
    )

    const data = events.map((ev: any) => ({
      ...ev,
      isFavorited: favoriteIds.has(ev.id),
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
    console.error("GET /api/events error:", err)
    return NextResponse.json(
      { message: "Failed to fetch events" },
      { status: 500 }
    )
  }
}