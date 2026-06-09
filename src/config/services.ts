import { BrainCircuit, CircuitBoard, Factory, Wrench } from "lucide-react";

export const services = [
  {
    titleKey: "services.manufacturing.title",
    descriptionKey: "services.manufacturing.description",
    Icon: Wrench,
    href: "/services/manufacturing",
    image: "/iiot.png",
    colSpan: "lg:col-span-4",
  },
  {
    titleKey: "services.automation.title",
    descriptionKey: "services.automation.description",
    Icon: Factory,
    href: "/services/automation",
    image: "/web-backdrop.png",
    colSpan: "lg:col-span-2",
  },
  {
    titleKey: "services.controlPanels.title",
    descriptionKey: "services.controlPanels.description",
    Icon: CircuitBoard,
    href: "/services/control-panels",
    image: "/panels.webp",
    colSpan: "lg:col-span-3",
  },
  {
    titleKey: "services.ai.title",
    descriptionKey: "services.ai.description",
    Icon: BrainCircuit,
    href: "/services/ai",
    image: "/ai-backdrop.png",
    colSpan: "lg:col-span-3",
  },
];
