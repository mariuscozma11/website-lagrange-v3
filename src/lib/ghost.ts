import GhostContentAPI from "@tryghost/content-api";

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
 * Fetch all published posts, paginated.
 */
export async function getPosts({
  page = 1,
  limit = 12,
}: {
  page?: number;
  limit?: number;
} = {}): Promise<GhostPaginatedResult> {
  // Build Ghost browse params - exclude html for listing performance
  const params: Record<string, unknown> = {
    include: "tags,authors",
    fields: "id,slug,title,excerpt,feature_image,published_at,reading_time",
    limit,
    page,
  };

  const result = await api.posts.browse(params);

  const meta = (
    result as unknown as {
      meta: { pagination: GhostPaginatedResult["pagination"] };
    }
  ).meta;

  const posts = result.map(formatPost);

  return {
    posts,
    pagination: meta.pagination,
  };
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
      { include: ["tags", "authors"] }
    );
    return formatPost(post);
  } catch {
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatPost(post: any): GhostPost {
  const p = post;
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
    tags,
    html: String(p.html || ""),
    authors,
  };
}
