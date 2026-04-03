import ContentListing from "@/components/ContentListing";

export default function DemosPage() {
  return (
    <ContentListing
      categoryTag="technical-demos"
      titleKey="demos.page.title"
      titleAccentKey="demos.page.titleAccent"
      descriptionKey="demos.page.description"
      basePath="/demos"
    />
  );
}
