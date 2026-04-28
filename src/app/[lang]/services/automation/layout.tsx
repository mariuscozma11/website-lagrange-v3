import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IIoT & Automation",
  description: "System integration, PLC programming, HMI/SCADA, robotics integration, predictive maintenance, and OEE monitoring. The data and edge layer for factories, warehouses, and physical operations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
