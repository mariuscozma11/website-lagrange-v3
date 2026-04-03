import ContentListing from "@/components/ContentListing";

export default function CaseStudiesPage() {
  return (
    <ContentListing
      categoryTag="case-studies"
      titleKey="caseStudies.page.title"
      titleAccentKey="caseStudies.page.titleAccent"
      descriptionKey="caseStudies.page.description"
      basePath="/case-studies"
    />
  );
}
