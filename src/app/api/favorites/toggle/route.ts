import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const { placeId, eventId } = body

  if ((!placeId && !eventId) || (placeId && eventId)) {
    return NextResponse.json(
      { error: "Provide either placeId or eventId" },
      { status: 400 }
    )
  }

  const userId = session.user.id

  const where = {
    userId,
    ...(placeId ? { placeId } : { eventId }),
  }

  const existing = await prisma.favorite.findFirst({
    where,
    select: { id: true },
  })

  if (existing) {
    await prisma.favorite.delete({
      where: { id: existing.id },
    })

    return NextResponse.json({ favorited: false })
  }

  await prisma.favorite.create({
    data: {
      userId,
      ...(placeId ? { placeId } : { eventId }),
    },
  })

  return NextResponse.json({ favorited: true })
}