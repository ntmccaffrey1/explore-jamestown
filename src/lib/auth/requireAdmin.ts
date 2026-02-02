import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function requireAdmin() {
  const session = await auth()

  if (!session?.user?.role || session.user.role !== "ADMIN") {
    return { authorized: false, response: NextResponse.json({ message: "Forbidden" }, { status: 403 }) }
  }

  return { authorized: true, session }
}