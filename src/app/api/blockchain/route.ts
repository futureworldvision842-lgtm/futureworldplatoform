import { NextRequest, NextResponse } from "next/server";
import { createAuditChain, validateChain, createHash } from "@/lib/blockchain";

// GET - Get blockchain explorer data
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") || "votes";

    // Demo blockchain data
    const sampleEntries = [
      { type: "VOTE", data: "Vote on Solar Panel Proposal", voter: "0x1a2b...3c4d", choice: "YES", timestamp: new Date().toISOString() },
      { type: "TRANSACTION", data: "Society Fund Transfer", from: "0x5e6f...7g8h", to: "0x9i0j...1k2l", amount: 500, timestamp: new Date().toISOString() },
      { type: "VOTE", data: "Vote on City Park Renovation", voter: "0x3m4n...5o6p", choice: "YES", timestamp: new Date().toISOString() },
      { type: "DONATION", data: "Earthquake Relief Donation", donor: "0x7q8r...9s0t", amount: 100, timestamp: new Date().toISOString() },
      { type: "VOTE", data: "Vote on Education Reform", voter: "0x1u2v...3w4x", choice: "NO", timestamp: new Date().toISOString() },
    ];

    const chain = createAuditChain(sampleEntries);
    const isValid = validateChain(chain);

    return NextResponse.json({
      chain,
      isValid,
      totalBlocks: chain.length,
      latestHash: chain[chain.length - 1].hash,
    });
  } catch (error) {
    console.error("Blockchain API error:", error);
    return NextResponse.json({ error: "Failed to fetch blockchain data" }, { status: 500 });
  }
}

// POST - Verify a hash
export async function POST(req: NextRequest) {
  try {
    const { data, hash } = await req.json();
    const computedHash = createHash(JSON.stringify(data));
    const isValid = computedHash === hash;

    return NextResponse.json({ isValid, computedHash });
  } catch (error) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
