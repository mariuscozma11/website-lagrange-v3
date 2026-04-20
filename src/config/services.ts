import { BrainCircuit, Globe, Smartphone, Factory } from "lucide-react";

export const services = [
  {
    titleKey: "services.automation.title",
    descriptionKey: "services.automation.description",
    Icon: Factory,
    href: "/services/automation",
    image: "/iiot.png",
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
  {
    titleKey: "services.web.title",
    descriptionKey: "services.web.description",
    Icon: Globe,
    href: "/services/web",
    image: "/web-backdrop.png",
    colSpan: "lg:col-span-4",
  },
  {
    titleKey: "services.mobile.title",
    descriptionKey: "services.mobile.description",
    Icon: Smartphone,
    href: "/services/mobile",
    image: "/mobile-backdrop.png",
    colSpan: "lg:col-span-2",
  },
];
