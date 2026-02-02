import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET /api/activities/[id]
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const place = await prisma.place.findUnique({
      where: { id: params.id },
    })

    if (!place || place.type !== "ACTIVITY") {
      return NextResponse.json({ message: "Activity not found" }, { status: 404 })
    }

    return NextResponse.json(place, { status: 200 })
  } catch (error) {
    console.error("GET /activities/[id] error:", error)
    return NextResponse.json({ message: "Failed to fetch activity" }, { status: 500 })
  }
}

// PATCH /api/activities/[id]
// Admin/scraper only
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    const isAdmin = session?.user?.role === "ADMIN"

    if (!isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
    }

    const body = await request.json()

    const updated = await prisma.place.update({
      where: { id: params.id },
      data: {
        ...body,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(updated, { status: 200 })
  } catch (error: any) {
    console.error("PATCH /activities/[id] error:", error)

    if (error.code === "P2025") {
      // prisma record not found
      return NextResponse.json({ message: "Activity not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Failed to update activity" }, { status: 500 })
  }
}