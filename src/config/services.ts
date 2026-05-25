import { BrainCircuit, CircuitBoard, Factory } from "lucide-react";

export const services = [
  {
    titleKey: "services.automation.title",
    descriptionKey: "services.automation.description",
    Icon: Factory,
    href: "/services/automation",
    image: "/iiot.png",
    colSpan: "lg:col-span-4",
  },
  {
    titleKey: "services.ai.title",
    descriptionKey: "services.ai.description",
    Icon: BrainCircuit,
    href: "/services/ai",
    image: "/ai-backdrop.png",
    colSpan: "lg:col-span-2",
  },
  {
    titleKey: "services.controlPanels.title",
    descriptionKey: "services.controlPanels.description",
    Icon: CircuitBoard,
    href: "/services/control-panels",
    image: "/iiot.png",
    colSpan: "lg:col-span-6",
  },
];
