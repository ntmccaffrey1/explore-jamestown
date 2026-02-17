import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import type { Prisma } from "@prisma/client"

export async function GET(request: Request) {
  try {
    const session = await auth();

    const { searchParams } = new URL(request.url);

    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const limit = Math.min(Number(searchParams.get("limit")) || 20, 100);
    const skip = (page - 1) * limit;

    const where: Prisma.PlaceWhereInput = {
      type: "LODGING",
      city: "Jamestown",
    };

    const [lodging, total] = await Promise.all([
      prisma.place.findMany({
        where,
        orderBy: { name: "asc" },
        skip,
        take: limit,
        select: {
          id: true,
          slug: true,
          name: true,
          image: true,
          address: true,
          website: true,
          email: true,
          socials: true,
          menu: true,
          description: true,
          amenities: true,
          phone: true,
          city: true,
          updatedAt: true,
        },
      }),
      prisma.place.count({ where }),
    ]);

    const favoriteIds = new Set<string>();

    if (session?.user?.id) {
      const favorites = await prisma.favorite.findMany({
        where: { userId: session.user.id },
        select: { placeId: true },
      });

      favorites.forEach((f) => {
        if (f.placeId) favoriteIds.add(f.placeId);
      });
    }

    const data = lodging.map((place) => ({
      ...place,
      isFavorited: favoriteIds.has(place.id),
    }));

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("GET /lodging error:", err);
    return NextResponse.json(
      { message: "Failed to fetch lodging" },
      { status: 500 }
    );
  }
}