import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI for Industrial Operations",
  description:
    "Industrial computer vision, anomaly detection, and operational LLMs. Vision systems for inspection and robotics, language models over technical documentation, voice for field and floor.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
