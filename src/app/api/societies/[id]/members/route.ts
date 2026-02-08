import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: societyId } = await params;
    if (!societyId) {
      return NextResponse.json({ error: "Society ID required" }, { status: 400 });
    }

    const members = await prisma.societyMember.findMany({
      where: { societyId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            location: true,
          },
        },
      },
      orderBy: { joinedAt: "desc" },
    });

    const votesByUser = await prisma.vote.groupBy({
      by: ["userId"],
      where: {
        proposal: { societyId },
      },
      _count: true,
    });
    const voteCountMap = Object.fromEntries(votesByUser.map((v) => [v.userId, v._count]));

    const list = members.map((m) => ({
      id: m.id,
      role: m.role,
      joinedAt: m.joinedAt,
      user: m.user,
      votesCast: voteCountMap[m.userId] ?? 0,
    }));

    return NextResponse.json({ members: list });
  } catch (error) {
    console.error("Fetch society members error:", error);
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
  }
}
