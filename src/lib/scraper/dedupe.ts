export function dedupe(items: any[]) {
  const map = new Map()

  for (const item of items) {
    const key = item.recid
      ? `r:${item.recid}`
      : `n:${item.name}-${item.city}`

    if (!map.has(key)) map.set(key, item)
  }

  return Array.from(map.values())
}