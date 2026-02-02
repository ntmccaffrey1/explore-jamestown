import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id, type } = await req.json()

    if (!id || !type) {
      return NextResponse.json({ message: "Missing id or type" }, { status: 400 })
    }

    if (type !== "place" && type !== "event") {
      return NextResponse.json({ message: "Invalid type" }, { status: 400 })
    }

    const whereClause = {
      userId: session.user.id,
      placeId: type === "place" ? id : undefined,
      eventId: type === "event" ? id : undefined,
    }

    const exists = await prisma.favorite.findFirst({
      where: whereClause
    })

    if (exists) {
      return NextResponse.json({ message: "Already favorited" }, { status: 409 })
    }

    const fav = await prisma.favorite.create({
      data: whereClause
    })

    return NextResponse.json(fav, { status: 201 })
  } catch (err) {
    console.error("POST /favorites error:", err)
    return NextResponse.json({ message: "Failed to create favorite" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { id, type } = await req.json()

    await prisma.favorite.deleteMany({
      where: {
        userId: session.user.id,
        ...(type === "place" ? { placeId: id } : {}),
        ...(type === "event" ? { eventId: id } : {}),
      }
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error("DELETE /favorites error:", err)
    return NextResponse.json({ message: "Failed to remove favorite" }, { status: 500 })
  }
}

export async function GET() {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json([], { status: 200 })
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" }
  })

  return NextResponse.json(favorites)
}