import { MetadataRoute } from "next";

const baseUrl = "https://novaworks.ro";
const languages = ["en", "ro"] as const;

// One logical page per entry; blog lives on blog.novaworks.ro with its own sitemap.
const pages = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/services/manufacturing", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/services/automation", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/services/ai", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/services/control-panels", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return pages.flatMap((page) => {
    const langAlternates = Object.fromEntries(
      languages.map((lang) => [lang, `${baseUrl}/${lang}${page.path}`])
    );

    return languages.map((lang) => ({
      url: `${baseUrl}/${lang}${page.path}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: { ...langAlternates, "x-default": `${baseUrl}/en${page.path}` },
      },
    }));
  });
}
