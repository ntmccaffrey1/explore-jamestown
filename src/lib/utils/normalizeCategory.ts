export function normalizeCategory(raw?: string | null, title?: string | null) {
  const r = (raw || "").toLowerCase();
  const t = (title || "").toLowerCase();

  // film detection via title
  if (
    t.includes("movie") ||
    t.includes("film") ||
    t.includes("matinee") ||
    t.includes("screening") ||
    /\(\d{4}\)/.test(t)
  ) {
    return "film";
  }

  // kids / teens
  if (r.includes("kid") || r.includes("child") || r.includes("teen")) {
    return "kids";
  }

  // music (for when we scrape Cafe)
  if (r.includes("music") || t.includes("band") || t.includes("concert")) {
    return "music";
  }

  // arts
  if (r.includes("arts") || t.includes("craft") || t.includes("painting")) {
    return "arts";
  }

  // town
  if (
    r.includes("community") ||
    r.includes("town") ||
    r.includes("council") ||
    r.includes("board") ||
    r.includes("committee") ||
    t.includes("town council") ||
    t.includes("historic")
  ) {
    return "town";
  }

  return "all";
}