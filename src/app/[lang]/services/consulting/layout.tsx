import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Consulting",
  description:
    "Architecture reviews, technology strategy, team augmentation, and performance audits.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
