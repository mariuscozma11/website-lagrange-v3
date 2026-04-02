import { BrainCircuit, Globe, Smartphone, MessageSquare } from "lucide-react";

export const services = [
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
    colSpan: "lg:col-span-3",
  },
  {
    titleKey: "services.mobile.title",
    descriptionKey: "services.mobile.description",
    Icon: Smartphone,
    href: "/services/mobile",
    image: "/mobile-backdrop.png",
    colSpan: "lg:col-span-4",
  },
  {
    titleKey: "services.consulting.title",
    descriptionKey: "services.consulting.description",
    Icon: MessageSquare,
    href: "#",
    image: "/consulting-backdrop.png",
    colSpan: "lg:col-span-2",
  },
];
