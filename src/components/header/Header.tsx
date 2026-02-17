import { auth } from "@/lib/auth"
import HeaderClient from "./HeaderClient"
import "./Header.css"

export const dynamic = "force-dynamic"

export default async function Header() {
  const session = await auth()
  return <HeaderClient session={session} />
}