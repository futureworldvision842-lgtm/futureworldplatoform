import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch services (optionally filter by societyId; when societyId given, only approved by default)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const societyId = searchParams.get("societyId");
    const approvedOnly = searchParams.get("approvedOnly") !== "false";

    const where: { status: string; category?: string; societyId?: string | null; approvedBySociety?: boolean } = {
      status: "ACTIVE",
      ...(category ? { category } : {}),
    };
    if (societyId) {
      where.societyId = societyId;
      if (approvedOnly) where.approvedBySociety = true;
    }

    const services = await prisma.service.findMany({
      where,
      include: {
        provider: { select: { id: true, name: true, avatar: true } },
        business: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ services });
  } catch (error) {
    console.error("Fetch services error:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

// POST - Create service (optional societyId: list in society pending approval)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, price, category, location, providerId, businessId, societyId } = body;

    const service = await prisma.service.create({
      data: {
        title,
        description,
        price,
        category,
        location,
        providerId,
        businessId,
        ...(societyId ? { societyId, approvedBySociety: false } : {}),
      },
    });

    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    console.error("Create service error:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
