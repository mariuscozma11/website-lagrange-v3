import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Control Panel Engineering & Build",
  description: "Industrial control panels designed, built, and tested to EN 60204-1 and EN 61439. Schematics, assembly, FAT, CE documentation, and retrofits.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
