import { MetadataRoute } from "next";

const baseUrl = "https://lagrangeengineering.ro";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = ["en", "ro"];

  // Static pages (blog lives on blog.lagrangeengineering.ro with its own sitemap)
  const staticPages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/services/automation", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/ai", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services/control-panels", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return languages.flatMap((lang) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${lang}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))
  );
}
