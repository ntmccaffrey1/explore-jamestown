interface Props {
  title: string
  children: React.ReactNode
}

export default function SectionShell({ title, children }: Props) {
  return (
    <section className="section">
      <div className="container padding-section">
        <h2 className="section-title">{title}</h2>
        {children}
      </div>
    </section>
  )
}