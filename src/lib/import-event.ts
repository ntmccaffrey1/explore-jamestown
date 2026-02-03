import { prisma } from "@/lib/prisma"
import type { Event as PrismaEvent } from "@prisma/client"

type ImportedEvent = {
  recid?: number | null
  title: string
  description?: string | null
  venue?: string | null
  startDate: Date
  endDate?: Date | null
  url?: string | null
  website?: string | null
  price?: string | null
  rawCategory?: string | null
  category?: string | null
  images?: string[]
  sources?: string[]
  source?: string
  sourceType?: string
  approved?: boolean
}

function normalizeEvent(event: PrismaEvent): ImportedEvent {
  if (!event.startDate) {
    throw new Error(`Event ${event.id} has no startDate`)
  }

  return {
    recid: event.recid,
    title: event.title,
    description: event.description,
    venue: event.venue,
    startDate: event.startDate,
    endDate: event.endDate,
    url: event.url,
    website: event.website,
    price: event.price,
    rawCategory: event.rawCategory,
    category: event.category,
    images: event.images ?? [],
    sources: event.sources ?? [],
    approved: event.approved,
  }
}

function mergeEvent(
  existing: ImportedEvent,
  incoming: ImportedEvent
) {
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

    approved: existing.approved,
  }
}

// Create or update an event
export async function upsertEvent(scraped: ImportedEvent) {
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

  let event =
    scraped.recid
      ? await prisma.event.findFirst({ where: { recid: scraped.recid } })
      : null

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

  const merged = mergeEvent(normalizeEvent(event), scraped)

  return prisma.event.update({
    where: { id: event.id },
    data: merged,
  })
}