import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to NovaWorks about your automation project. Control panels, PLC and robotics, machine vision, IIoT and edge, built and commissioned in-house in Timișoara, Romania.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
