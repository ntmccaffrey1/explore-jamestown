export function normalizeUrl(url: string | null | undefined) {
  if (!url) return url
  try {
    const u = new URL(url)
    u.search = ""
    u.hash = ""
    return u.toString()
  } catch {
    return url
  }
}