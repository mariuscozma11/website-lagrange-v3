import { NextRequest, NextResponse } from "next/server";
import { getPosts } from "@/lib/ghost";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category") || "articles";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "12", 10);

  if (category !== "articles") {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  try {
    const result = await getPosts({
      categoryTag: category,
      filterTags: [],
      search: "",
      page,
      limit,
    });

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Ghost API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
