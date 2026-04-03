import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CaseStudiesCTA from "@/components/CaseStudiesCTA";
import BlogCTA from "@/components/BlogCTA";
import AboutTeaser from "@/components/AboutTeaser";
import ContactCTA from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Software engineering team building AI systems, web applications, and mobile apps. Based in Timisoara, Romania.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <CaseStudiesCTA />
      <AboutTeaser />
      <BlogCTA />
      <ContactCTA />
    </>
  );
}
