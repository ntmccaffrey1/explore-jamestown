"use client"

import "./FavoriteItem.css"
import { XIcon } from "../icons/XIcon/XIcon"
import type { FavoriteItemUI } from "@/types/favorite"
import { stripHtml } from "@/lib/utils/stripHtml"

export default function FavoriteItem({
    item,
    onClick,
    onRemove,
    }: {
    item: FavoriteItemUI
    onClick: () => void
    onRemove: () => void
    }) {
    const { type, data } = item

    const image =
        type === "place"
        ? data.image
        : data.images?.[0] ?? null

    const title =
        type === "place"
        ? data.name
        : data.title

    const description =
        type === "place"
        ? data.description
        : data.description

    const meta =
        type === "place"
        ? [data.address, data.phone].filter(Boolean)
        : [
            data.startDate
                ? new Date(data.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                })
                : null,
            data.venue,
            ].filter(Boolean)

    return (
        <div className="list_grid--item rows" onClick={onClick}>
            <div className="col-1">
                {image && <img src={image} alt={title} />}
            </div>

            <div className="col-2">
                <h4>{title}</h4>
                {description && (
                    <p className="description">
                    {stripHtml(description)}
                    </p>
                )}
            </div>

            <div className="col-3">
                <div className="col-3--info">
                    {meta.map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                </div>

                <button
                    className="favorite-remove"
                    aria-label="Remove from favorites"
                    onClick={(e) => {
                        e.stopPropagation()
                        onRemove()
                    }}
                    >
                    <XIcon />
                </button>
            </div>
        </div>
    )
}