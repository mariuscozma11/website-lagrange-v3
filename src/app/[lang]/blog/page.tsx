import type { Metadata } from "next";
import ContentListing from "@/components/ContentListing";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering insights, technical deep-dives, and lessons learned from building production systems.",
};

export default function BlogPage() {
  return (
    <ContentListing
      categoryTag="articles"
      titleKey="blog.page.title"
      titleAccentKey="blog.page.titleAccent"
      descriptionKey="blog.page.description"
      basePath="/blog"
    />
  );
}
