import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import BlogCTA from "@/components/BlogCTA";
import AboutTeaser from "@/components/AboutTeaser";
import ContactCTA from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Full-stack industrial automation, from the control cabinet to the dashboard. Control panels, PLC and robotics, vision and IIoT. One team for the hardware on the floor and the software and data on top. Based in Timișoara, Romania.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <AboutTeaser />
      <BlogCTA />
      <ContactCTA />
    </>
  );
}
