export interface EventUI {
  id: string

  title: string
  description?: string

  startDate?: string | Date
  endDate?: string | Date

  venue?: string
  url?: string
  website?: string
  price?: string

  images?: string[]

  category?: string
  rawCategory?: string

  isFavorited?: boolean

  approved?: boolean
}