import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

interface Params {
  params: { id: string }
}

/**
 * GET /api/dining/[id]
 */
export async function GET(_: Request, { params }: Params) {
  try {
    const { id } = params

    const dining = await prisma.place.findUnique({
      where: { id },
    })

    if (!dining || dining.type !== "DINING") {
      return NextResponse.json({ message: "Dining not found" }, { status: 404 })
    }

    return NextResponse.json(dining, { status: 200 })
  } catch (err) {
    console.error("GET /dining/[id] error:", err)
    return NextResponse.json({ message: "Failed to fetch dining" }, { status: 500 })
  }
}

/**
 * PATCH /api/dining/[id]
 * (admin/system use only)
 */
export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = params
    const data = await request.json()

    const updated = await prisma.place.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(updated, { status: 200 })
  } catch (err: any) {
    if (err.code === "P2025") {
      return NextResponse.json({ message: "Dining not found" }, { status: 404 })
    }

    console.error("PATCH /dining/[id] error:", err)
    return NextResponse.json({ message: "Failed to update dining" }, { status: 500 })
  }
}