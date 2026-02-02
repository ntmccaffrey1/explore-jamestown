import type { PlaceUI } from "./place"
import type { EventUI } from "./event"

export type FavoriteItemUI =
  | { type: "place"; data: PlaceUI }
  | { type: "event"; data: EventUI }