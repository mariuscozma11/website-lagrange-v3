import type { Metadata } from "next";
import ContentListing from "@/components/ContentListing";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real projects, real results. See how we've helped businesses solve technical challenges across industries.",
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
