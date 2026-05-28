import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IIoT & Automation",
  description: "System integration, PLC programming, HMI/SCADA, robotics integration, predictive maintenance, and OEE monitoring. Full-stack automation for factories, warehouses, and physical operations, from the floor to the data.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
