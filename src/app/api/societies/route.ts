import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch societies
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");

    const societies = await prisma.society.findMany({
      where: city ? { cityName: city } : {},
      include: {
        admin: { select: { id: true, name: true, avatar: true } },
        _count: { select: { members: true, proposals: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ societies });
  } catch (error) {
    console.error("Fetch societies error:", error);
    return NextResponse.json({ error: "Failed to fetch societies" }, { status: 500 });
  }
}

// POST - Create society
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, type, description, address, cityName, countryName, adminId } = body;

    const society = await prisma.society.create({
      data: {
        name,
        type,
        description,
        address,
        cityName,
        countryName,
        adminId,
        members: {
          create: {
            userId: adminId,
            role: "ADMIN",
          },
        },
      },
    });

    // Update user role
    await prisma.user.update({
      where: { id: adminId },
      data: { role: "SOCIETY_ADMIN" },
    });

    return NextResponse.json({ society }, { status: 201 });
  } catch (error) {
    console.error("Create society error:", error);
    return NextResponse.json({ error: "Failed to create society" }, { status: 500 });
  }
}
