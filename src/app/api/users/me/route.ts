import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { z } from "zod"

const userUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  image: z.string().url().optional(),
})

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        favorites: true,
        createdAt: true,
      }
    })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (err) {
    console.error("GET /users/me error:", err)
    return NextResponse.json({ message: "Failed to fetch user" }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const parsed = userUpdateSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const updated = await prisma.user.update({
      where: { email: session.user.email },
      data: parsed.data,
    })

    return NextResponse.json(updated)
  } catch (err) {
    console.error("PATCH /users/me error:", err)
    return NextResponse.json({ message: "Failed to update user" }, { status: 500 })
  }
}