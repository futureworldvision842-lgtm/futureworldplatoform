import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createTransactionHash } from "@/lib/blockchain";

// GET - Fetch donation campaigns
export async function GET() {
  try {
    const campaigns = await prisma.donationCampaign.findMany({
      where: { status: "ACTIVE" },
      include: {
        _count: { select: { donations: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ campaigns });
  } catch (error) {
    console.error("Fetch campaigns error:", error);
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
  }
}

// POST - Create donation or campaign
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === "create_campaign") {
      const { title, description, targetAmount, level } = body;

      const campaign = await prisma.donationCampaign.create({
        data: { title, description, targetAmount, level },
      });

      return NextResponse.json({ campaign }, { status: 201 });
    }

    if (action === "donate") {
      const { campaignId, donorId, amount, message } = body;

      const blockchainHash = createTransactionHash({
        fromId: donorId,
        toId: campaignId,
        amount,
        type: "DONATION",
        timestamp: new Date().toISOString(),
      });

      const donation = await prisma.donation.create({
        data: {
          amount,
          message: message || "",
          blockchainHash,
          donorId,
          campaignId,
        },
      });

      // Update campaign raised amount
      await prisma.donationCampaign.update({
        where: { id: campaignId },
        data: { raisedAmount: { increment: amount } },
      });

      return NextResponse.json({ donation, blockchainHash }, { status: 201 });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Donation error:", error);
    return NextResponse.json({ error: "Failed to process donation" }, { status: 500 });
  }
}
