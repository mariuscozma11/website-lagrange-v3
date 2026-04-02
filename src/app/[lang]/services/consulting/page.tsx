"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "motion/react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import FAQ from "@/components/FAQ";
import {
  LayoutDashboard,
  Compass,
  Users,
  Gauge,
  ArrowRightLeft,
  ShieldCheck,
} from "lucide-react";

const consultingCards = [
  {
    titleKey: "services.consulting.architecture.title",
    descriptionKey: "services.consulting.architecture.description",
    Icon: LayoutDashboard,
    colSpan: "lg:col-span-2",
  },
  {
    titleKey: "services.consulting.strategy.title",
    descriptionKey: "services.consulting.strategy.description",
    Icon: Compass,
    colSpan: "lg:col-span-2",
  },
  {
    titleKey: "services.consulting.augmentation.title",
    descriptionKey: "services.consulting.augmentation.description",
    Icon: Users,
    colSpan: "lg:col-span-2",
  },
  {
    titleKey: "services.consulting.performance.title",
    descriptionKey: "services.consulting.performance.description",
    Icon: Gauge,
    colSpan: "lg:col-span-3",
  },
  {
    titleKey: "services.consulting.migration.title",
    descriptionKey: "services.consulting.migration.description",
    Icon: ArrowRightLeft,
    colSpan: "lg:col-span-3",
  },
  {
    titleKey: "services.consulting.quality.title",
    descriptionKey: "services.consulting.quality.description",
    Icon: ShieldCheck,
    colSpan: "lg:col-span-6",
  },
];

const faqItems = [
  { questionKey: "services.consulting.faq.q1", answerKey: "services.consulting.faq.a1" },
  { questionKey: "services.consulting.faq.q2", answerKey: "services.consulting.faq.a2" },
  { questionKey: "services.consulting.faq.q3", answerKey: "services.consulting.faq.a3" },
  { questionKey: "services.consulting.faq.q4", answerKey: "services.consulting.faq.a4" },
];

export default function ConsultingServicePage() {
  const { t, language } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="max-w-[1440px] mx-auto pt-8 pb-12 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl text-4xl font-medium tracking-tight text-neutral-800 sm:text-5xl md:text-6xl dark:text-neutral-200"
        >
          {t("services.consulting.page.title")}{" "}
          <span className="text-primary">{t("services.consulting.page.titleAccent")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400"
        >
          {t("services.consulting.page.description")}
        </motion.p>
      </section>

      {/* Bento Grid */}
      <section className="max-w-[1440px] mx-auto pb-16 xl:pb-24 px-6">
        <BentoGrid className="grid-cols-1 lg:grid-cols-6 lg:auto-rows-[200px] xl:auto-rows-[220px]">
          {consultingCards.map((card, index) => (
            <motion.div
              key={card.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
              className={card.colSpan}
            >
              <BentoCard
                name={t(card.titleKey)}
                description={t(card.descriptionKey)}
                Icon={card.Icon}
                href={`/${language}/contact`}
                cta={t("services.consulting.cta")}
                className="h-full"
                background={<div />}
              />
            </motion.div>
          ))}
        </BentoGrid>
      </section>

      {/* FAQ */}
      <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
        <FAQ
          headingKey1="services.consulting.faq.heading1"
          headingKey2="services.consulting.faq.heading2"
          items={faqItems}
        />
      </section>
    </>
  );
}
