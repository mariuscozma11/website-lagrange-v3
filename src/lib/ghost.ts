import GhostContentAPI from "@tryghost/content-api";

const CATEGORY_TAGS = ["articles", "case-studies", "technical-demos"];

const api = new GhostContentAPI({
  url: process.env.GHOST_URL!,
  key: process.env.GHOST_CONTENT_API_KEY!,
  version: "v5.0",
});

export interface GhostTag {
  id: string;
  slug: string;
  name: string;
}

export interface GhostPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  feature_image: string | null;
  published_at: string;
  reading_time: number;
  tags: GhostTag[];
  html: string;
  authors: {
    id: string;
    name: string;
    profile_image: string | null;
    bio: string | null;
  }[];
}

export interface GhostPaginatedResult {
  posts: GhostPost[];
  pagination: {
    page: number;
    limit: number;
    pages: number;
    total: number;
  };
}

/**
 * Fetch posts filtered by a main category tag, with optional additional tag filters.
 * When search is provided, we fetch ALL matching posts from Ghost and paginate manually
 * so that search + pagination work correctly together.
 */
export async function getPosts({
  categoryTag,
  filterTags = [],
  search = "",
  page = 1,
  limit = 12,
}: {
  categoryTag: string;
  filterTags?: string[];
  search?: string;
  page?: number;
  limit?: number;
}): Promise<GhostPaginatedResult> {
  const tagFilters = [categoryTag, ...filterTags]
    .map((t) => `tag:${t}`)
    .join("+");

  if (search) {
    // When searching: fetch all posts for this category+tags, filter by search, paginate manually
    const allPosts = await fetchAllPosts(tagFilters);
    const term = search.toLowerCase();
    const filtered = allPosts.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.excerpt.toLowerCase().includes(term)
    );

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * limit;
    const paged = filtered.slice(start, start + limit);

    return {
      posts: paged,
      pagination: {
        page: safePage,
        limit,
        pages: totalPages,
        total,
      },
    };
  }

  // No search: let Ghost handle pagination directly
  const result = await api.posts.browse({
    include: "tags,authors",
    limit,
    page,
    filter: tagFilters,
  });

  const meta = (
    result as unknown as {
      meta: { pagination: GhostPaginatedResult["pagination"] };
    }
  ).meta;

  return {
    posts: result.map(formatPost),
    pagination: meta.pagination,
  };
}

/**
 * Fetch ALL posts for a given tag filter (loops through all pages).
 * Used for search so we can filter + paginate correctly.
 */
async function fetchAllPosts(tagFilter: string): Promise<GhostPost[]> {
  const all: GhostPost[] = [];
  let currentPage = 1;
  let totalPages = 1;

  while (currentPage <= totalPages) {
    const result = await api.posts.browse({
      include: "tags,authors",
      limit: 100,
      page: currentPage,
      filter: tagFilter,
    });

    const meta = (
      result as unknown as {
        meta: { pagination: { pages: number } };
      }
    ).meta;

    all.push(...result.map(formatPost));
    totalPages = meta.pagination.pages;
    currentPage++;
  }

  return all;
}

/**
 * Fetch a single post by slug.
 */
export async function getPostBySlug(
  slug: string
): Promise<GhostPost | null> {
  try {
    const post = await api.posts.read(
      { slug },
      { include: "tags,authors" }
    );
    return formatPost(post);
  } catch {
    return null;
  }
}

/**
 * Fetch all tags excluding the main category tags.
 * These are the filterable tags shown in the UI.
 */
export async function getFilterTags(): Promise<GhostTag[]> {
  const tags = await api.tags.browse({ limit: "all" });
  return tags
    .filter((t) => !CATEGORY_TAGS.includes(t.slug))
    .map((t) => ({
      id: t.id,
      slug: t.slug,
      name: t.name || t.slug,
    }));
}

function formatPost(post: Record<string, unknown>): GhostPost {
  const p = post as Record<string, unknown>;
  const tags = (
    (p.tags as Array<Record<string, unknown>>) || []
  ).map((t) => ({
    id: String(t.id),
    slug: String(t.slug),
    name: String(t.name || t.slug),
  }));
  const authors = (
    (p.authors as Array<Record<string, unknown>>) || []
  ).map((a) => ({
    id: String(a.id),
    name: String(a.name),
    profile_image: a.profile_image as string | null,
    bio: a.bio as string | null,
  }));

  return {
    id: String(p.id),
    slug: String(p.slug),
    title: String(p.title),
    excerpt: String(p.excerpt || ""),
    feature_image: p.feature_image as string | null,
    published_at: String(p.published_at),
    reading_time: Number(p.reading_time || 0),
    tags: tags.filter((t) => !CATEGORY_TAGS.includes(t.slug)),
    html: String(p.html || ""),
    authors,
  };
}
