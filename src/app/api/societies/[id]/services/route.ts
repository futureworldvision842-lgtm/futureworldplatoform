import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth-helpers";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id: societyId } = await params;
    const { searchParams } = new URL(req.url);
    const pendingOnly = searchParams.get("pendingOnly") === "true";

    const society = await prisma.society.findUnique({
      where: { id: societyId },
      select: { adminId: true },
    });
    if (!society) {
      return NextResponse.json({ error: "Society not found" }, { status: 404 });
    }
    const isAdmin = society.adminId === userId;
    const isMember = await prisma.societyMember.findUnique({
      where: { userId_societyId: { userId, societyId } },
    });
    if (!isAdmin && !isMember) {
      return NextResponse.json({ error: "Not a member of this society" }, { status: 403 });
    }

    const where: { societyId: string; approvedBySociety?: boolean } = { societyId };
    if (pendingOnly) where.approvedBySociety = false;

    const services = await prisma.service.findMany({
      where,
      include: {
        provider: { select: { id: true, name: true, email: true, avatar: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ services });
  } catch (error) {
    console.error("GET society services error:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}
