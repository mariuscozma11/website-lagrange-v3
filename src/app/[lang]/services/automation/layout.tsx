import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IIoT & Automation",
  description: "System integration, PLC programming, HMI/SCADA development, robotics integration, predictive maintenance, and OEE monitoring. Domain expertise in industrial automation meets production-ready software.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
