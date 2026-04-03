import type { Metadata } from "next";
import ContentListing from "@/components/ContentListing";

export const metadata: Metadata = {
  title: "Technical Demos",
  description:
    "Interactive proof of concepts and live demonstrations of our technical capabilities.",
};

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
