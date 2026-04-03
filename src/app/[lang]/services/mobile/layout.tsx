import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile Apps",
  description:
    "Cross-platform mobile apps with React Native. One codebase for iOS and Android.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
