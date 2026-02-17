interface Props {
  title: string
  children: React.ReactNode
  className?: string
}

export default function SectionShell({ title, children, className }: Props) {
  return (
    <section className={`section ${className ?? ""}`}>
      <div className="container padding-section">
        <h2 className="section-title">{title}</h2>
        {children}
      </div>
    </section>
  )
}