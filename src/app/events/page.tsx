import EventsPage from "@/components/events/EventsPage"

export default async function Events({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  return (
    <EventsPage
      title="Events"
      basePath="/events"
      endpoint="/api/events"
      searchParams={searchParams}
    />
  )
}