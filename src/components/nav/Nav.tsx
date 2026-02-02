import { auth } from "@/lib/auth"
import NavClient from "./NavClient"

export const dynamic = "force-dynamic"

export default async function Nav() {
  const session = await auth()

  return <NavClient session={session} />
}