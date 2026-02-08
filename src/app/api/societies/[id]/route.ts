import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Society ID required" }, { status: 400 });
    }

    const society = await prisma.society.findUnique({
      where: { id },
      include: {
        admin: { select: { id: true, name: true, email: true, avatar: true } },
        _count: { select: { members: true, proposals: true, posts: true, teams: true } },
        proposals: {
          orderBy: { createdAt: "desc" },
          take: 5,
          select: {
            id: true,
            title: true,
            status: true,
            yesVotes: true,
            noVotes: true,
            abstainVotes: true,
            endDate: true,
          },
        },
        posts: {
          orderBy: { createdAt: "desc" },
          take: 5,
          include: { author: { select: { id: true, name: true, avatar: true } } },
        },
      },
    });

    if (!society) {
      return NextResponse.json({ error: "Society not found" }, { status: 404 });
    }

    return NextResponse.json({ society });
  } catch (error) {
    console.error("Fetch society error:", error);
    return NextResponse.json({ error: "Failed to fetch society" }, { status: 500 });
  }
}
