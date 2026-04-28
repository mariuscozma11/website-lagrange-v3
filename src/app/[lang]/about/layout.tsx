import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "A small team of engineers in Timișoara, Romania. Industrial IoT, automation, and embedded systems for manufacturing and adjacent physical operations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
