import PlacesClient from "./PlacesClient"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

interface PlacesPageProps {
  title: string
  basePath: string
  endpoint: string
  searchParams?: Record<string, string | string[] | undefined>
}

export default async function PlacesPage({
  title,
  endpoint,
  searchParams,
}: PlacesPageProps) {
  const session = await auth()

  const params = await searchParams
  const page = Number(params?.page ?? 1)

  const endpointWithParams = `${endpoint}?page=${page}`

  const h = await headers()
  const protocol = h.get("x-forwarded-proto") ?? "http"
  const host = h.get("host")

  if (!host) {
    throw new Error("Missing host header")
  }

  const url = `${protocol}://${host}${endpointWithParams}`

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      cookie: h.get("cookie") ?? "",
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch data for ${title}`)
  }

  const { data: places, pagination } = await res.json()

  return (
    <PlacesClient
      title={title}
      endpoint={endpoint}
      places={places}
      pagination={pagination}
      isLoggedIn={!!session}
    />
  )
}