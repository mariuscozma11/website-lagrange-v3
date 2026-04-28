import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Software",
  description:
    "Operations dashboards, plant and fleet portals, technician mobile tools, and internal interfaces that wrap around industrial and IoT deployments.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
