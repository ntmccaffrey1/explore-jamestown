import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function LodgingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const place = await prisma.place.findUnique({
    where: { slug },
  });

  if (!place) return <div className="p-6">Not found</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="font-semibold text-2xl">{place.name}</h1>

      {place.image && (
        <Image
          src={place.image}
          width={800}
          height={500}
          alt={place.name}
          className="rounded"
        />
      )}

      {place.address && <p>{place.address}</p>}
      {place.phone && <p>{place.phone}</p>}
      {place.website && (
        <a href={place.website} className="underline" target="_blank">
          Visit Website
        </a>
      )}

      {place.description && (
        <p className="opacity-80 leading-relaxed">{place.description}</p>
      )}
    </div>
  );
}