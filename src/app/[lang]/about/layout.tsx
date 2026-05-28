import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "A team of engineers in Timișoara, Romania, building industrial automation end to end. Control panels, PLC and robotics, plus the modern IIoT, edge, and vision layer on top.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
