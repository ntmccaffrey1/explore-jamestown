import EventsClient from "./EventsClient"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

interface EventsPageProps {
  title: string
  basePath: string
  endpoint: string
  searchParams?: Record<string, string | string[] | undefined>
}

export default async function EventsPage({
  title,
  endpoint,
  searchParams,
}: EventsPageProps) {
  const session = await auth()

  const params = await searchParams
  const page = Number(params?.page ?? 1)
    const apiPage = page - 1 

const endpointWithParams = `${endpoint}?page=${apiPage}&limit=12`

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

  const { data: events, pagination } = await res.json()

  return (
    <EventsClient
      title={title}
      endpoint={endpoint}
      events={events}
      pagination={pagination}
      isLoggedIn={!!session}
    />
  )
}