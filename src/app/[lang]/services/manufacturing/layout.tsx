import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Automation Systems",
  description: "Complete automation systems designed and built in-house: mechanical CAD and fabrication, control panels, PLC, robotics and vision, integrated and commissioned. One team, one contract, a finished and tested system.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
