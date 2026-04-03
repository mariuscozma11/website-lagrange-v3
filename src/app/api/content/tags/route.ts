import { NextResponse } from "next/server";
import { getFilterTags } from "@/lib/ghost";

export async function GET() {
  try {
    const tags = await getFilterTags();
    return NextResponse.json({ tags });
  } catch (error) {
    console.error("Ghost API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 }
    );
  }
}
