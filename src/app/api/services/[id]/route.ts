import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth-helpers";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const { approvedBySociety } = body;

    const service = await prisma.service.findUnique({
      where: { id },
      select: { id: true, societyId: true },
    });
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    if (!service.societyId) {
      return NextResponse.json({ error: "Service is not linked to a society" }, { status: 400 });
    }

    const society = await prisma.society.findUnique({
      where: { id: service.societyId },
      select: { adminId: true },
    });
    if (society?.adminId !== userId) {
      return NextResponse.json({ error: "Only society admin can approve services" }, { status: 403 });
    }

    const updated = await prisma.service.update({
      where: { id },
      data: { approvedBySociety: !!approvedBySociety },
    });
    return NextResponse.json({ service: updated });
  } catch (error) {
    console.error("PATCH service error:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}
