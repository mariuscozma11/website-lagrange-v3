import { NextRequest, NextResponse } from "next/server";
import { getPosts } from "@/lib/ghost";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category") || "articles";
  const filterTags = searchParams.get("tags")?.split(",").filter(Boolean) || [];
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "12", 10);

  const validCategories = ["articles", "case-studies", "technical-demos"];
  if (!validCategories.includes(category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  try {
    const result = await getPosts({
      categoryTag: category,
      filterTags,
      search,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Ghost API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
