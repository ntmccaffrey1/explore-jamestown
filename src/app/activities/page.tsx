import PlacesPage from "@/components/places/PlacesPage"

export default async function ActivitiesPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  return (
    <PlacesPage
      title="Activities"
      basePath="/activities"
      endpoint={`/api/activities`}
      searchParams={searchParams}
    />
  )
}