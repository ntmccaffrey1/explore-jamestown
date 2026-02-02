"use client"

import PlusIcon from "../../icons/PlusIcon/PlusIcon"
import "./LoadMore.css"

interface LoadMoreProps {
  hasMore: boolean
  loading: boolean
  onLoadMore: () => void
}

export default function LoadMore({
  hasMore,
  loading,
  onLoadMore,
}: LoadMoreProps) {
  if (!hasMore) return null

  return (
    <div className="load-more">
      <button
      className="btn"
        onClick={onLoadMore}
        disabled={loading}
        aria-busy={loading}
      >
        <PlusIcon />
        {loading ? "Loading…" : "Load more"}
      </button>
    </div>
  )
}