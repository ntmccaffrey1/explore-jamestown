type DedupeKeyItem = {
  recid?: number | null
  name?: string | null
  city?: string | null
}

export function dedupe<T extends DedupeKeyItem>(items: T[]): T[] {
  const map = new Map<string, T>()

  for (const item of items) {
    const key = item.recid
      ? `r:${item.recid}`
      : `n:${item.name ?? ""}-${item.city ?? ""}`

    if (!map.has(key)) {
      map.set(key, item)
    }
  }

  return Array.from(map.values())
}