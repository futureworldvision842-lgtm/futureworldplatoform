import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - List teams (user's teams + optionally by society)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const societyId = searchParams.get("societyId");

    if (userId) {
      const teams = await prisma.team.findMany({
        where: {
          members: { some: { userId } },
        },
        include: {
          createdBy: { select: { id: true, name: true } },
          society: { select: { id: true, name: true, cityName: true } },
          _count: { select: { members: true } },
        },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json({ teams });
    }

    if (societyId) {
      const teams = await prisma.team.findMany({
        where: { societyId },
        include: {
          createdBy: { select: { id: true, name: true } },
          _count: { select: { members: true } },
        },
      });
      return NextResponse.json({ teams });
    }

    const teams = await prisma.team.findMany({
      include: {
        createdBy: { select: { id: true, name: true } },
        society: { select: { id: true, name: true, cityName: true } },
        _count: { select: { members: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ teams });
  } catch (error) {
    console.error("Fetch teams error:", error);
    return NextResponse.json({ error: "Failed to fetch teams" }, { status: 500 });
  }
}

// POST - Create team
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, createdById, societyId } = body;

    if (!name?.trim() || !createdById) {
      return NextResponse.json({ error: "Name and creator are required" }, { status: 400 });
    }

    const team = await prisma.team.create({
      data: {
        name: name.trim(),
        description: (description || "").trim(),
        createdById,
        societyId: societyId || null,
        members: {
          create: { userId: createdById, role: "LEADER" },
        },
      },
      include: {
        createdBy: { select: { id: true, name: true } },
        society: { select: { id: true, name: true } },
        _count: { select: { members: true } },
      },
    });

    return NextResponse.json({ team }, { status: 201 });
  } catch (error) {
    console.error("Create team error:", error);
    return NextResponse.json({ error: "Failed to create team" }, { status: 500 });
  }
}
