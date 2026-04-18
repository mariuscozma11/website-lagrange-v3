import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IoT & Industrial IoT",
  description: "Predictive maintenance, OEE monitoring, energy tracking, legacy machine retrofit, and SCADA modernization. We bridge factory floor to cloud without disrupting production.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
