import "./GridList.css";

interface GridListProps {
    children: any;
}

export default function GridList({ children }: GridListProps) {
  return (
    <div className="grid-list">
      {children}
    </div>
  );
}