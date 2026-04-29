import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
// import CaseStudiesCTA from "@/components/CaseStudiesCTA";
import BlogCTA from "@/components/BlogCTA";
import AboutTeaser from "@/components/AboutTeaser";
import ContactCTA from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Industrial IoT, automation, and embedded systems specialists. We build the modern software, data, and edge layer for factories, warehouses, fields, and infrastructure. Based in Timișoara, Romania.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      {/* <CaseStudiesCTA /> */}
      <AboutTeaser />
      <BlogCTA />
      <ContactCTA />
    </>
  );
}
