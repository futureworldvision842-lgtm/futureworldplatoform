import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth, canAccessSocietyAdmin } from "@/lib/auth-helpers";
import { joinRequestSchema } from "@/lib/validators";

// POST - Create join request (logged-in user)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuth();
    if ("error" in authResult) return authResult.error;
    const { id: userId } = authResult;

    const { id: societyId } = await params;
    if (!societyId) {
      return NextResponse.json({ error: "Society ID required" }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    const parsed = joinRequestSchema.safeParse({ societyId, ...body });
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const society = await prisma.society.findUnique({ where: { id: societyId } });
    if (!society) {
      return NextResponse.json({ error: "Society not found" }, { status: 404 });
    }

    const existingMember = await prisma.societyMember.findUnique({
      where: { userId_societyId: { userId, societyId } },
    });
    if (existingMember) {
      return NextResponse.json({ error: "Already a member" }, { status: 400 });
    }

    const existingRequest = await prisma.societyJoinRequest.findUnique({
      where: { userId_societyId: { userId, societyId } },
    });
    if (existingRequest) {
      if (existingRequest.status === "PENDING") {
        return NextResponse.json({ error: "Join request already pending" }, { status: 400 });
      }
      // Allow new request if previous was rejected
    }

    const request = await prisma.societyJoinRequest.upsert({
      where: { userId_societyId: { userId, societyId } },
      create: {
        userId,
        societyId,
        message: parsed.data.message ?? "",
        status: "PENDING",
      },
      update: { message: parsed.data.message ?? "", status: "PENDING", reviewedAt: null, reviewedById: null },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true, address: true, cnic: true } },
      },
    });

    return NextResponse.json({ request });
  } catch (error) {
    console.error("Join request create error:", error);
    return NextResponse.json({ error: "Failed to create join request" }, { status: 500 });
  }
}

// GET - List join requests (society admin only)
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAuth();
    if ("error" in authResult) return authResult.error;
    const { id: userId, role } = authResult;

    const { id: societyId } = await params;
    if (!societyId) {
      return NextResponse.json({ error: "Society ID required" }, { status: 400 });
    }

    const canAdmin = await canAccessSocietyAdmin(userId, role, societyId);
    if (!canAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const requests = await prisma.societyJoinRequest.findMany({
      where: { societyId },
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true, address: true, cnic: true } },
      },
    });

    return NextResponse.json({ requests });
  } catch (error) {
    console.error("Join requests list error:", error);
    return NextResponse.json({ error: "Failed to list join requests" }, { status: 500 });
  }
}
