import { prisma } from "@/lib/prisma"

function mergeEvent(existing: any, incoming: any) {
  return {
    recid:
      incoming.recid !== undefined
        ? incoming.recid
        : existing.recid,

    title: incoming.title ?? existing.title,

    description:
      incoming.description !== undefined
        ? incoming.description
        : existing.description,

    venue: incoming.venue ?? existing.venue,

    startDate:
      incoming.startDate !== undefined
        ? incoming.startDate
        : existing.startDate,

    // allow null overwrite for endDate
    endDate:
      incoming.endDate !== undefined
        ? incoming.endDate
        : existing.endDate,

    url: incoming.url ?? existing.url,

    website:
      incoming.website !== undefined
        ? incoming.website
        : existing.website,

    price:
      incoming.price !== undefined
        ? incoming.price
        : existing.price,

    rawCategory:
      incoming.rawCategory !== undefined
        ? incoming.rawCategory
        : existing.rawCategory,

    category:
      incoming.category !== undefined
        ? incoming.category
        : existing.category,

    images: Array.from(
      new Set([...(existing.images ?? []), ...(incoming.images ?? [])])
    ),

    sources: Array.from(
      new Set([...(existing.sources ?? []), ...(incoming.sources ?? [])])
    ),

    approved: existing.approved, // 🔒 never override manual approval
  }
}

/**
 * Create or update an event 
 */
export async function upsertEvent(scraped: any) {
  if (!scraped?.title || !scraped?.startDate) {
    console.warn("Skipping invalid event:", scraped?.title)
    return null
  }

  const source =
    scraped.source ??
    scraped.sourceType ??
    scraped.sources?.[0] ??
    "unknown"

  scraped.sources = Array.isArray(scraped.sources)
    ? scraped.sources
    : [source]

  let event = null

  if (scraped.recid) {
    event = await prisma.event.findFirst({
      where: { recid: scraped.recid },
    })
  }

  if (!event) {
    event = await prisma.event.findFirst({
      where: {
        title: scraped.title,
        startDate: scraped.startDate,
        sources: { has: source },
      },
    })
  }

  if (!event && scraped.venue) {
    event = await prisma.event.findFirst({
      where: {
        title: scraped.title,
        venue: scraped.venue,
        startDate: scraped.startDate,
      },
    })
  }

  if (!event) {
    event = await prisma.event.findFirst({
      where: {
        title: scraped.title,
        startDate: scraped.startDate,
      },
    })
  }

  if (!event) {
    return prisma.event.create({
      data: {
        recid: scraped.recid ?? null,
        title: scraped.title,
        description: scraped.description ?? null,
        venue: scraped.venue ?? null,
        startDate: scraped.startDate,
        endDate: scraped.endDate ?? null,
        url: scraped.url ?? null,
        website: scraped.website ?? null,
        price: scraped.price ?? null,
        category: scraped.category ?? null,
        rawCategory: scraped.rawCategory ?? null,
        images: scraped.images ?? [],
        sources: scraped.sources,
        approved: true,
      },
    })
  }

  const merged = mergeEvent(event, scraped)

  return prisma.event.update({
    where: { id: event.id },
    data: merged,
  })
}