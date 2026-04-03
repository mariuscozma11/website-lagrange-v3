import ContentListing from "@/components/ContentListing";

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
