import type { Metadata } from "next";
import ContentListing from "@/components/ContentListing";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Worked examples and reference architectures from industrial IoT, embedded, and automation projects.",
};

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
