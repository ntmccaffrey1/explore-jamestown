export interface PlaceUI {
  id: string

  slug?: string | null 
  name: string

  description?: string | null
  image?: string | null
  address?: string | null
  phone?: string | null
  email?: string | null
  website?: string | null
  menu?: string | null

  socials?: {
    instagram?: string | null
    facebook?: string | null
  } | null

  amenities?: string[] | null
  city?: string | null

  isFavorited?: boolean
}