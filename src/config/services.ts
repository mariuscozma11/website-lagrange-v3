import { BrainCircuit, Globe, Smartphone, MessageSquare } from "lucide-react";

export const services = [
  {
    titleKey: "services.ai.title",
    descriptionKey: "services.ai.description",
    Icon: BrainCircuit,
    href: "#",
    image: "/ai-backdrop.png",
    colSpan: "lg:col-span-3",
  },
  {
    titleKey: "services.web.title",
    descriptionKey: "services.web.description",
    Icon: Globe,
    href: "#",
    image: "/web-backdrop.png",
    colSpan: "lg:col-span-3",
  },
  {
    titleKey: "services.mobile.title",
    descriptionKey: "services.mobile.description",
    Icon: Smartphone,
    href: "#",
    image: "/mobile-backdrop.png",
    colSpan: "lg:col-span-4",
  },
  {
    titleKey: "services.consulting.title",
    descriptionKey: "services.consulting.description",
    Icon: MessageSquare,
    href: "#",
    image: "https://placehold.co/800x600/1a1a1a/333333?text=Consulting",
    colSpan: "lg:col-span-2",
  },
];
