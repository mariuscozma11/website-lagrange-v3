"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { BentoCard, BentoGrid } from "./ui/bento-grid";
import { motion } from "motion/react";
import { services } from "@/config/services";

function BlurImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-contain object-right transition-all duration-500 group-hover:blur-sm group-hover:scale-105"
    />
  );
}

export default function Services() {
  const { t, language } = useLanguage();

  return (
    <section className="max-w-[1440px] mx-auto pt-8 xl:pt-12 pb-16 xl:pb-24 px-6">
      <BentoGrid className="grid-cols-1 lg:grid-cols-6 lg:auto-rows-[240px] xl:auto-rows-[280px]">
        {services.map((service, index) => (
          <motion.div
            key={service.titleKey}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={service.colSpan}
          >
            <BentoCard
              name={t(service.titleKey)}
              description={t(service.descriptionKey)}
              Icon={service.Icon}
              href={`/${language}${service.href}`}
              cta={t("services.cta")}
              className="h-full"
              background={<BlurImage src={service.image} alt={t(service.titleKey)} />}
            />
          </motion.div>
        ))}
      </BentoGrid>
    </section>
  );
}
