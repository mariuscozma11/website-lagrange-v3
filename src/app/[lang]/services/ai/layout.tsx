import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Computer Vision & ML",
  description:
    "Industrial inspection and defect detection, vision-guided robotics and automation, and OCR / document understanding for industrial operations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
