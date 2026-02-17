import { runBrowser } from "@/lib/scraper/runBrowser"
import { scrapeList } from "@/lib/scraper/scrapeList"
import { scrapeDetail } from "@/lib/scraper/scrapeDetail"
import { dedupe } from "@/lib/scraper/dedupe"
import { upsertPlace } from "@/lib/import-place"

const SOURCES = [
  "https://www.discovernewport.org/things-to-do/?view=grid&sort=qualityScore&bounds=false&filter_regions%5B0%5D=41",
  "https://www.discovernewport.org/about-newport/nine-coastal-communities/jamestown/?view=grid&sort=qualityScore&bounds=false&filter_subcats%5B0%5D=465&filter_subcats%5B1%5D=469&filter_subcats%5B2%5D=472&filter_subcats%5B3%5D=467&filter_subcats%5B4%5D=577&filter_subcats%5B5%5D=466&filter_subcats%5B6%5D=470&filter_subcats%5B7%5D=471&filter_subcats%5B8%5D=488&filter_subcats%5B9%5D=468",
]

export async function GET() {
  // Disable scrape in prod
  if (process.env.NODE_ENV === "production") {
    return Response.json({ error: "Scraper disabled" }, { status: 404 })
  }

  await runBrowser(async (browser) => {
    const lists = await Promise.all(
      SOURCES.map(src =>
        scrapeList(browser, src, "ACTIVITIES", "Jamestown")
      )
    )

    const all = lists.flat()
    const final = dedupe(all)

    console.log("Activities found:", final.length)

    for (const item of final) {
      if (!item.url) continue

      const detail = await scrapeDetail(browser, item.url)

      await upsertPlace({
        ...item,
        ...detail,
        image: detail?.image ?? item.image,
        images: detail?.images ?? [],
      })
    }
  })

  return Response.json({ ok: true })
}