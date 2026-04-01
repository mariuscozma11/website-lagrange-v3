"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { BentoCard, BentoGrid } from "./ui/bento-grid";
import { BrainCircuit, Globe, Smartphone, MessageSquare } from "lucide-react";
import { motion } from "motion/react";

function BlurImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover transition-all duration-500 group-hover:blur-sm group-hover:scale-105"
    />
  );
}

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      name: t("services.ai.title"),
      description: t("services.ai.description"),
      Icon: BrainCircuit,
      href: "#",
      cta: t("services.cta"),
      image: "https://placehold.co/800x600/1a1a1a/333333?text=AI",
      colSpan: "lg:col-span-3",
    },
    {
      name: t("services.web.title"),
      description: t("services.web.description"),
      Icon: Globe,
      href: "#",
      cta: t("services.cta"),
      image: "https://placehold.co/800x600/1a1a1a/333333?text=Web",
      colSpan: "lg:col-span-3",
    },
    {
      name: t("services.mobile.title"),
      description: t("services.mobile.description"),
      Icon: Smartphone,
      href: "#",
      cta: t("services.cta"),
      image: "https://placehold.co/800x600/1a1a1a/333333?text=Mobile",
      colSpan: "lg:col-span-4",
    },
    {
      name: t("services.consulting.title"),
      description: t("services.consulting.description"),
      Icon: MessageSquare,
      href: "#",
      cta: t("services.cta"),
      image: "https://placehold.co/800x600/1a1a1a/333333?text=Consulting",
      colSpan: "lg:col-span-2",
    },
  ];

  return (
    <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
      <BentoGrid className="grid-cols-1 lg:grid-cols-6 lg:auto-rows-[240px] xl:auto-rows-[280px]">
        {services.map((service, index) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            className={service.colSpan}
          >
            <BentoCard
              name={service.name}
              description={service.description}
              Icon={service.Icon}
              href={service.href}
              cta={service.cta}
              className="h-full"
              background={<BlurImage src={service.image} alt={service.name} />}
            />
          </motion.div>
        ))}
      </BentoGrid>
    </section>
  );
}
