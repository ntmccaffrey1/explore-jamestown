import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

interface Params {
  params: {
    id: string
  }
}

/**
 * GET /api/lodging/[id]
 * Public: returns a single lodging place
 */
export async function GET(_: Request, { params }: Params) {
  try {
    const { id } = params

    const lodging = await prisma.place.findFirst({
      where: {
        id,
        type: "LODGING"
      }
    })

    if (!lodging) {
      return NextResponse.json(
        { message: "Lodging not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(lodging)
  } catch (err) {
    console.error("GET /lodging/[id] error:", err)
    return NextResponse.json(
      { message: "Failed to fetch lodging" },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/lodging/[id]
 * Admin/system update
 */
export async function PATCH(req: Request, { params }: Params) {
  try {
    const session = await auth()

    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 }
      )
    }

    const { id } = params
    const body = await req.json()

    const updated = await prisma.place.update({
      where: { id },
      data: {
        ...body,
        updatedAt: new Date()
      }
    })

    return NextResponse.json(updated)
  } catch (err) {
    console.error("PATCH /lodging/[id] error:", err)
    return NextResponse.json(
      { message: "Failed to update lodging" },
      { status: 500 }
    )
  }
}