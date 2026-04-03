import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "A team of engineers and collaborators based in Timisoara, Romania. Building AI systems, web applications, and mobile apps.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
