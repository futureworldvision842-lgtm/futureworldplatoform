import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth, canAccessSocietyAdmin } from "@/lib/auth-helpers";

// PATCH - Approve or reject join request (society admin only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; requestId: string }> }
) {
  try {
    const authResult = await requireAuth();
    if ("error" in authResult) return authResult.error;
    const { id: userId, role } = authResult;

    const { id: societyId, requestId } = await params;
    if (!societyId || !requestId) {
      return NextResponse.json({ error: "Society ID and request ID required" }, { status: 400 });
    }

    const canAdmin = await canAccessSocietyAdmin(userId, role, societyId);
    if (!canAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const status = body.status === "APPROVED" ? "APPROVED" : body.status === "REJECTED" ? "REJECTED" : null;
    if (!status) {
      return NextResponse.json({ error: "status must be APPROVED or REJECTED" }, { status: 400 });
    }

    const joinRequest = await prisma.societyJoinRequest.findFirst({
      where: { id: requestId, societyId },
      include: { user: true },
    });
    if (!joinRequest) {
      return NextResponse.json({ error: "Join request not found" }, { status: 404 });
    }
    if (joinRequest.status !== "PENDING") {
      return NextResponse.json({ error: "Request already processed" }, { status: 400 });
    }

    await prisma.societyJoinRequest.update({
      where: { id: requestId },
      data: { status, reviewedAt: new Date(), reviewedById: userId },
    });

    if (status === "APPROVED") {
      await prisma.societyMember.create({
        data: {
          userId: joinRequest.userId,
          societyId,
          role: "MEMBER",
        },
      });
    }

    const updated = await prisma.societyJoinRequest.findUnique({
      where: { id: requestId },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    return NextResponse.json({ request: updated });
  } catch (error) {
    console.error("Join request update error:", error);
    return NextResponse.json({ error: "Failed to update join request" }, { status: 500 });
  }
}
