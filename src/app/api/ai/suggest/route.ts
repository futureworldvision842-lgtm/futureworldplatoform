import { NextRequest, NextResponse } from "next/server";
import { suggestSolutions } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const problem = typeof body.problem === "string" ? body.problem.trim() : "";
    if (!problem) {
      return NextResponse.json({ error: "Problem description is required" }, { status: 400 });
    }
    const suggestions = await suggestSolutions(problem);
    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error("AI suggest error:", error);
    return NextResponse.json({ error: "Failed to get suggestions" }, { status: 500 });
  }
}
