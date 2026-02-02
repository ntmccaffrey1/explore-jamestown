import PlacesPage from "@/components/places/PlacesPage"

export default async function LodgingPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  return (
    <PlacesPage
      title="Lodging"
      basePath="/lodging"
      endpoint="/api/lodging"
      searchParams={searchParams}
    />
  )
}