import { runBrowser } from "@/lib/scraper/runBrowser"
import { scrapeList } from "@/lib/scraper/scrapeList"
import { scrapeDetail } from "@/lib/scraper/scrapeDetail"
import { dedupe } from "@/lib/scraper/dedupe"
import { upsertPlace } from "@/lib/import-place"

const BASE_URL = "https://www.discovernewport.org/about-newport/nine-coastal-communities/jamestown/?view=grid&sort=qualityScore&bounds=false&filter_subcats%5B0%5D=485"

export async function GET() {

  // Disable scrape in prod
  if (process.env.NODE_ENV === "production") {
    return Response.json({ error: "Scraper disabled" }, { status: 404 })
  }

  await runBrowser(async (browser) => {

    const list = await scrapeList(browser, BASE_URL, "DINING", "Jamestown");

    const final = dedupe(list)

    for (const item of final) {
      if (!item.url) continue
      const detail = await scrapeDetail(browser, item.url, { menu: true })
      await upsertPlace({ ...item, ...detail })
    }
  })

  return Response.json({ ok: true })
}