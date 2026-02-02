import { prisma } from "@/lib/prisma"
import slugify from "slugify"

function makeSlug(name: string) {
  return slugify(name, { lower: true, strict: true })
}

function normalize(value: any): any {
  if (value === null || value === undefined) return null

  if (typeof value === "string") {
    const v = value.trim()
    if (!v) return null
    if (/^(n\/a|na|null|undefined|none)$/i.test(v)) return null
    return v
  }

  if (Array.isArray(value)) {
    return Array.from(
      new Set(
        value
          .map(v => normalize(v))
          .filter(Boolean)
      )
    )
  }

  if (typeof value === "object") {
    const out: any = {}
    for (const k in value) {
      const v = normalize(value[k])
      if (v) out[k] = v
    }
    return Object.keys(out).length ? out : null
  }

  return value
}

// manual db edits wins
function mergeField(db: any, scr: any) {
  db = normalize(db)
  scr = normalize(scr)

  if (db !== null && db !== undefined && db !== "") return db
  return scr ?? db
}

function merge(existing: any, scraped: any) {
  return {
    name:        mergeField(existing.name, scraped.name),
    type:        mergeField(existing.type, scraped.type),
    address:     mergeField(existing.address, scraped.address),
    phone:       mergeField(existing.phone, scraped.phone),
    email:       mergeField(existing.email, scraped.email),
    website:     mergeField(existing.website, scraped.website),
    menu:        mergeField(existing.menu, scraped.menu),
    url:         mergeField(existing.url, scraped.url),
    city:        mergeField(existing.city, scraped.city),
    description: mergeField(existing.description, scraped.description),

    image: mergeField(existing.image, scraped.image),

    images: normalize([
      ...(existing.images ?? []),
      ...(scraped.images ?? []),
    ]),

    amenities: normalize([
      ...(existing.amenities ?? []),
      ...(scraped.amenities ?? []),
    ]),

    socials: {
      ...(normalize(scraped.socials) ?? {}),
      ...(normalize(existing.socials) ?? {}),
    },

    lat: existing.lat ?? scraped.lat,
    lng: existing.lng ?? scraped.lng,
  }
}

export async function upsertPlace(scraped: any) {
  const existing = await prisma.place.findFirst({
    where: { name: scraped.name, city: scraped.city }
  })

  if (!existing) {
    return prisma.place.create({
      data: {
        ...normalize(scraped),
        slug: makeSlug(scraped.name),
      }
    })
  }

  const merged = merge(existing, scraped)

  return prisma.place.update({
    where: { id: existing.id },
    data: {
      ...merged,
      slug: existing.slug ?? makeSlug(scraped.name),
    }
  })
}