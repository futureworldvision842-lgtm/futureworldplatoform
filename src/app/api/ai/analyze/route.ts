import { NextRequest, NextResponse } from "next/server";
import { analyzePolicy } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { title, description, level } = await req.json();

    if (!title || !description || !level) {
      return NextResponse.json(
        { error: "Title, description, and level are required" },
        { status: 400 }
      );
    }

    const analysis = await analyzePolicy({ title, description, level });

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Policy Analysis Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze policy" },
      { status: 500 }
    );
  }
}
