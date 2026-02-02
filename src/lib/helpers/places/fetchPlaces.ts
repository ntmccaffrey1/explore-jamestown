import { headers } from "next/headers"

export default async function fetchPlaces(
  endpoint: string,
  { page = 1, limit = 8 }: { page?: number; limit?: number } = {}
) {
  const h = await headers()
  const host = h.get("host")
  const protocol = h.get("x-forwarded-proto") ?? "http"

  if (!host) return []

  const res = await fetch(
    `${protocol}://${host}/api/${endpoint}?page=${page}&limit=${limit}`,
    {
      cache: "no-store",
      headers: {
        cookie: h.get("cookie") ?? "",
      },
    }
  )

  if (!res.ok) return []

  const { data } = await res.json()
  return data
}