import "./GridList.css";
import type { ReactNode } from "react"

interface GridListProps {
  children: ReactNode
}

export default function GridList({ children }: GridListProps) {
  return (
    <div className="grid-list">
      {children}
    </div>
  );
}