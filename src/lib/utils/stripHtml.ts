export function stripHtml(html?: string | null, maxLength = 160) {
  if (!html) return ""

  // Remove tags
  const text = html.replace(/<[^>]*>/g, "")

  // Decode HTML entities safely
  const decoded = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")

  return decoded.length > maxLength
    ? decoded.slice(0, maxLength).trim() + "…"
    : decoded
}