import { normalizeUrl } from "./normalizeUrl"

export async function scrapeDetail(browser: any, url: string, opts?: { menu?: boolean }) {
  const page = await browser.newPage()
  await page.goto(url, { waitUntil: "networkidle" })

  const detail = await page.evaluate((opts: any) => {
    const qs = (sel: string) => document.querySelector(sel)

    const name = qs("h1")?.textContent?.trim() ?? null

    const street = qs(".street-address")?.textContent?.trim() ?? ""
    const cityState = qs(".city-state-zip")?.textContent?.trim() ?? ""
    const address = [street, cityState].filter(Boolean).join(", ")

    const phone = qs("a[href^='tel:']")?.textContent?.trim() ?? null
    const website = (qs(".website") as HTMLAnchorElement)?.href ?? null

    const email = (qs("a[href^='mailto:']") as HTMLAnchorElement)
      ?.href?.replace("mailto:", "").trim() ?? null

    const description = qs("#descriptionTab .core-styles")?.textContent?.trim() ?? null

    const amenities = Array.from(
      document.querySelectorAll(".amenities li, .amenities dd")
    )
      .map(el => el.textContent?.trim())
      .filter(Boolean)

    let menu: string | null = null
    if (opts?.menu) {
      const menuAnchor = Array.from(
        document.querySelectorAll("a")
      ).find(a => /menu/i.test((a.textContent || "").trim()))
      menu = menuAnchor ? (menuAnchor as HTMLAnchorElement).href : null
    }

    const socials = Array.from(
        document.querySelectorAll(".social-icons a") as NodeListOf<HTMLAnchorElement>
        ).reduce((acc, a) => {
        const service = a.getAttribute("data-sv-service")?.toLowerCase();
        const url = a.href;

        if (!service || !url) return acc;

        // Strip DN tracking redirects
        const realUrl = url.includes("redirect=")
            ? decodeURIComponent(url.split("redirect=")[1])
            : url;

        acc[service] = realUrl;
        return acc;
        }, {} as Record<string, string>);

    const heroImg =
      document.querySelector(".detail-gallery a[data-sv-play]")?.getAttribute("href") ?? null

    const images = Array.from(
      document.querySelectorAll(".detail-gallery a[data-sv-play]")
    )
      .map(a => (a as HTMLAnchorElement).href)
      .filter(Boolean)

    return {
      name,
      address,
      phone,
      email,
      website,
      menu,
      socials,
      description,
      amenities,
      image: heroImg,
      images
    }
  }, opts)

  // Try resolving redirect for DiscoverNewport link
  if (detail.website && detail.website.includes("plugins/crm/count")) {
    try {
      const rpage = await browser.newPage()
      const res = await rpage.goto(detail.website, { waitUntil: "networkidle" })
      const finalUrl = res?.url()
      await rpage.close()

      if (finalUrl && finalUrl !== detail.website) {
        detail.website = normalizeUrl(finalUrl)
      }
    } catch {}
  }

  await page.close()
  return detail
}