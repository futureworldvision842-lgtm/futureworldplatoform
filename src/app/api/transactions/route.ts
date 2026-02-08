import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createTransactionHash } from "@/lib/blockchain";

// GET - Fetch transactions
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [{ fromUserId: userId }, { toUserId: userId }],
      },
      include: {
        fromUser: { select: { id: true, name: true, avatar: true } },
        toUser: { select: { id: true, name: true, avatar: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ transactions });
  } catch (error) {
    console.error("Fetch transactions error:", error);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}

// POST - Create transaction
export async function POST(req: NextRequest) {
  try {
    const { fromUserId, toUserId, amount, type, description } = await req.json();

    // Create blockchain hash
    const blockchainHash = createTransactionHash({
      fromId: fromUserId,
      toId: toUserId,
      amount,
      type,
      timestamp: new Date().toISOString(),
    });

    const transaction = await prisma.transaction.create({
      data: {
        fromUserId,
        toUserId,
        amount,
        type,
        description: description || "",
        blockchainHash,
      },
    });

    return NextResponse.json({ transaction, blockchainHash }, { status: 201 });
  } catch (error) {
    console.error("Transaction error:", error);
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 });
  }
}
