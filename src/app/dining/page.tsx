import PlacesPage from "@/components/places/PlacesPage"

export default async function DiningPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  return (
    <PlacesPage
      title="Dining"
      basePath="/dining"
      endpoint={`/api/dining`}
      searchParams={searchParams}
    />
  )
}