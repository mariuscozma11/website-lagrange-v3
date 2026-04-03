import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Development",
  description:
    "Web applications, ecommerce platforms, content management systems, and desktop apps built with modern technologies.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
