import { chromium } from "playwright"
import { upsertEvent } from "@/lib/import-event"
import { normalizeCategory } from "@/lib/utils/normalizeCategory"

type ScrapedEvent = {
  recid: number | null
  title: string | null
  description: string | null
  startDate: Date | null
  endDate: Date | null
  venue: string | null
  images: string[]
  url: string
  website: string | null
  rawCategory: string | null
  category: string | null
  price: string | null
  sources: string[]
}

export async function GET() {
  const baseURL =
    "https://www.discovernewport.org/events/?view=grid&sort=date&bounds=false"

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  let skip = 0
  const pageSize = 12
  const allEvents: ScrapedEvent[] = []

  try {
    while (true) {
      const url = `${baseURL}&skip=${skip}`
      console.log("Scraping grid:", url)

      await page.goto(url, { waitUntil: "networkidle" })

      const items = await page.$$eval(
        ".item[data-type='events']",
        rows =>
          rows.map(row => {
            const el = row as HTMLElement

            const recid = el.getAttribute("data-recid")
            const title =
              el.querySelector("h4 a")?.textContent?.trim() || null
            const url =
              el.querySelector("h4 a")?.getAttribute("href") || null
            const img =
              el.querySelector("img.thumb")?.getAttribute("src") || null
            const venue =
              el.querySelector(".locations a")?.textContent?.trim() || null

            return {
              recid: recid ? Number(recid) : null,
              title,
              url: url
                ? `https://www.discovernewport.org${url}`
                : null,
              venue,
              images: img ? [img] : [],
            }
          })
      )

      if (!items.length) {
        console.log("No more grid items, stopping.")
        break
      }

      for (const item of items) {
        if (!item.url) continue

        console.log("Scraping detail:", item.url)
        await page.goto(item.url, { waitUntil: "networkidle" })

        const detail = await page.evaluate(() => {
          const title =
            document.querySelector("h1")?.textContent?.trim() || null

          const dateText = (() => {
            const dds = document.querySelectorAll(".priority-info dd")
            return dds.length
              ? dds[0].textContent?.trim() || null
              : null
          })()

          let timeText: string | null = null
          const dts = Array.from(
            document.querySelectorAll(".priority-info dt")
          )
          for (const dt of dts) {
            if (dt.textContent?.includes("Time")) {
              timeText =
                dt.nextElementSibling?.textContent?.trim() || null
              break
            }
          }

          const descriptionHtml =
            document.querySelector(".core-styles")?.innerHTML?.trim() || null

          const venue =
            document.querySelector(".two-line-wrap a")?.textContent?.trim() ||
            null

          const website =
            document.querySelector<HTMLAnchorElement>(
              ".action-item.website"
            )?.href || null

          const images = Array.from(
            document.querySelectorAll(".detail-gallery img")
          )
            .map(img => img.getAttribute("src"))
            .filter(Boolean) as string[]

          return {
            title,
            dateText,
            timeText,
            descriptionHtml,
            venue,
            website,
            images,
          }
        })

        const { startDate, endDate } = parseEventDates(
          detail.dateText,
          detail.timeText
        )

        const now = new Date(Date.now() - 12 * 60 * 60 * 1000)
        if (!startDate || startDate < now) continue

        allEvents.push({
          recid: item.recid,
          title: detail.title || item.title,
          description: detail.descriptionHtml,
          startDate,
          endDate,
          venue: detail.venue || item.venue,
          images: Array.from(
            new Set(
              (detail.images?.length ? detail.images : item.images) ?? []
            )
          ),
          url: item.url,
          website: detail.website,
          rawCategory: null,
          category: normalizeCategory(null, detail.title),
          price: null,
          sources: ["discover-newport"],
        })
      }

      skip += pageSize

      if (skip > 300) {
        console.log("Safety stop reached.")
        break
      }
    }

    console.log(`Scraped + kept: ${allEvents.length}`)

    for (const ev of allEvents) {
      if (!ev.title || !ev.startDate) continue

      await upsertEvent({
        ...ev,
        title: ev.title,
        startDate: ev.startDate,
      })
    }

    return Response.json({
      ok: true,
      stored: allEvents.length,
    })
  } catch (err) {
    console.error("Discover Newport scraper failed:", err)
    return Response.json(
      { ok: false, error: "Scrape failed" },
      { status: 500 }
    )
  } finally {
    await browser.close()
  }
}

function parseEventDates(
  dateText?: string | null,
  timeText?: string | null
) {
  if (!dateText) return { startDate: null, endDate: null }

  const year = new Date().getFullYear()
  const cleanDate = dateText.replace(/(\d+)(st|nd|rd|th)/, "$1")

  let baseDate = new Date(`${cleanDate} ${year}`)

  const now = new Date()
  if (baseDate < now && baseDate.getMonth() < now.getMonth()) {
    baseDate = new Date(`${cleanDate} ${year + 1}`)
  }

  if (!timeText || !timeText.toLowerCase().includes("to")) {
    return {
      startDate: isNaN(baseDate.getTime()) ? null : baseDate,
      endDate: null,
    }
  }

  const match = timeText.match(/From:\s*(.+?)\s*to\s*(.+)/i)
  if (!match) {
    return {
      startDate: isNaN(baseDate.getTime()) ? null : baseDate,
      endDate: null,
    }
  }

  const [, startTime, endTime] = match

  const startDate = new Date(
    `${baseDate.toDateString()} ${startTime}`
  )
  const endDate = new Date(
    `${baseDate.toDateString()} ${endTime}`
  )

  return {
    startDate: isNaN(startDate.getTime()) ? null : startDate,
    endDate: isNaN(endDate.getTime()) ? null : endDate,
  }
}