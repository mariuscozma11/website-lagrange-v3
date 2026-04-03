import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI & Machine Learning",
  description:
    "Custom AI solutions, from computer vision and OCR to speech recognition and large language models.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
