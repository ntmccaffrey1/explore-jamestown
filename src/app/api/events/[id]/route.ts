import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { eventAdminUpdateSchema } from "@/lib/validations/eventSchema"
import { auth } from "@/lib/auth"
import { ObjectId } from "mongodb"

interface Params {
  params: { id: string }
}

export async function GET(_: Request, { params }: Params) {
  try {
    const { id } = params

    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 })
    }

    const event = await prisma.event.findFirst({
      where: { id, approved: true },
      include: { place: true },
    })

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 })
    }

    return NextResponse.json(event)
  } catch (err) {
    console.error("GET /events/[id] error:", err)
    return NextResponse.json(
      { message: "Failed to fetch event" },
      { status: 500 }
    )
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const session = await auth()

    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    const { id } = params

    if (!/^[a-fA-F0-9]{24}$/.test(id)) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 })
    }

    const body = await req.json()
    const parsed = eventAdminUpdateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    // ▾ After fixing ZOD, we MUST pluck source before rest
    const { placeId, source, ...rest } = parsed.data

    const updated = await prisma.event.update({
      where: { id },
      data: {
        ...rest,
        ...(placeId === null
          ? { placeId: null }
          : placeId !== undefined
          ? { placeId } // just string
          : {}),
        ...(source !== undefined ? { source } : {}),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(updated)

  } catch (err: any) {
    console.error("PATCH /events/[id] error:", err)
    return NextResponse.json({ message: "Failed to update event" }, { status: 500 })
  }
}