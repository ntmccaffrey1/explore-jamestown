import Link from "next/link"
import "./GridPagination.css"

interface GridPaginationProps {
  pagination: {
    page: number;
    pages: number;
  } | null;
  basePath: string;
}

export default function GridPagination({ pagination, basePath }: GridPaginationProps) {
  if (!pagination || pagination.pages <= 1) return null;

  return (
    <div className="pagination">
      {pagination.page > 1 && (
        <Link href={`${basePath}?page=${pagination.page - 1}`}>
          Prev
        </Link>
      )}
      <span>Page {pagination.page} of {pagination.pages}</span>
      {pagination.page < pagination.pages && (
        <Link href={`${basePath}?page=${pagination.page + 1}`}>
          Next
        </Link>
      )}
    </div>
  );
}