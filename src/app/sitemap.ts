import { MetadataRoute } from "next";
import GhostContentAPI from "@tryghost/content-api";

const baseUrl = "https://lagrangeengineering.ro";

const api = new GhostContentAPI({
  url: process.env.GHOST_URL!,
  key: process.env.GHOST_CONTENT_API_KEY!,
  version: "v5.0",
});

async function getPostSlugs(tag: string): Promise<string[]> {
  try {
    const posts = await api.posts.browse({
      filter: `tag:${tag}`,
      fields: "slug,updated_at",
      limit: "all",
    });
    return posts.map((p) => String(p.slug));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const languages = ["en", "ro"];

  // Static pages
  const staticPages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/services/ai", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/web", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/mobile", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/automation", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/consulting", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/case-studies", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/demos", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const staticEntries = languages.flatMap((lang) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${lang}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))
  );

  // Dynamic pages from Ghost
  const [caseStudySlugs, articleSlugs, demoSlugs] = await Promise.all([
    getPostSlugs("case-studies"),
    getPostSlugs("articles"),
    getPostSlugs("technical-demos"),
  ]);

  const dynamicEntries = languages.flatMap((lang) => [
    ...caseStudySlugs.map((slug) => ({
      url: `${baseUrl}/${lang}/case-studies/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...articleSlugs.map((slug) => ({
      url: `${baseUrl}/${lang}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...demoSlugs.map((slug) => ({
      url: `${baseUrl}/${lang}/demos/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]);

  return [...staticEntries, ...dynamicEntries];
}
