import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createVoteHash } from "@/lib/blockchain";

// GET - Fetch proposals
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const level = searchParams.get("level");
    const status = searchParams.get("status") || "ACTIVE";

    const proposals = await prisma.proposal.findMany({
      where: {
        ...(level ? { level } : {}),
        status,
      },
      include: {
        createdBy: {
          select: { id: true, name: true, avatar: true },
        },
        _count: { select: { votes: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ proposals });
  } catch (error) {
    console.error("Fetch proposals error:", error);
    return NextResponse.json({ error: "Failed to fetch proposals" }, { status: 500 });
  }
}

// POST - Create proposal or vote
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === "create_proposal") {
      const { title, description, level, endDate, createdById, societyId, cityId, countryId } = body;

      const proposal = await prisma.proposal.create({
        data: {
          title,
          description,
          level,
          endDate: new Date(endDate),
          createdById,
          societyId,
          cityId,
          countryId,
        },
      });

      return NextResponse.json({ proposal }, { status: 201 });
    }

    if (action === "vote") {
      const { proposalId, userId, choice } = body;

      // Check if already voted
      const existingVote = await prisma.vote.findUnique({
        where: {
          proposalId_userId: { proposalId, userId },
        },
      });

      if (existingVote) {
        return NextResponse.json({ error: "Already voted on this proposal" }, { status: 400 });
      }

      // Create blockchain hash for the vote
      const blockchainHash = createVoteHash({
        odlId: userId,
        proposalId,
        choice,
        timestamp: new Date().toISOString(),
      });

      // Create vote and update proposal counts
      const vote = await prisma.vote.create({
        data: {
          choice,
          blockchainHash,
          proposalId,
          userId,
        },
      });

      // Update vote counts
      const updateField =
        choice === "YES" ? "yesVotes" : choice === "NO" ? "noVotes" : "abstainVotes";

      await prisma.proposal.update({
        where: { id: proposalId },
        data: { [updateField]: { increment: 1 } },
      });

      return NextResponse.json({ vote, blockchainHash }, { status: 201 });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Voting error:", error);
    return NextResponse.json({ error: "Failed to process vote" }, { status: 500 });
  }
}
