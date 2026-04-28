"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "motion/react";
import TechGrid, { type Technology } from "@/components/TechGrid";
import FAQ from "@/components/FAQ";
import ServicesList from "@/components/ServicesList";
import DashboardDemo from "@/components/interactive/DashboardDemo";
import OfflineSync from "@/components/interactive/OfflineSync";
import NativeFeatures from "@/components/interactive/NativeFeatures";
import ContactCTA from "@/components/ContactCTA";

const technologies: Technology[] = [
  { name: "Next.js", image: "/tech/nextjs.svg" },
  { name: "TypeScript", image: "/tech/typescript.svg" },
  { name: "Node.js", image: "/tech/nodejs.svg" },
  { name: "NestJS", image: "/tech/nestjs.svg" },
  { name: "FastAPI", image: "/tech/fastapi.svg" },
  { name: "PostgreSQL", image: "/tech/postgresql.svg" },
  { name: "InfluxDB", image: "/tech/influxdb.svg" },
  { name: "Grafana", image: "/tech/grafana.svg" },
  { name: "MQTT", image: "/tech/mqtt.svg" },
  { name: "Docker", image: "/tech/docker.svg" },
];

const faqItems = [
  { questionKey: "services.customSoftware.faq.q1", answerKey: "services.customSoftware.faq.a1" },
  { questionKey: "services.customSoftware.faq.q2", answerKey: "services.customSoftware.faq.a2" },
  { questionKey: "services.customSoftware.faq.q3", answerKey: "services.customSoftware.faq.a3" },
  { questionKey: "services.customSoftware.faq.q4", answerKey: "services.customSoftware.faq.a4" },
];

const customServices = [
  {
    titleKey: "services.customSoftware.portals.title",
    descriptionKey: "services.customSoftware.portals.description",
    tag: "portals",
    element: <DashboardDemo />,
  },
  {
    titleKey: "services.customSoftware.technician.title",
    descriptionKey: "services.customSoftware.technician.description",
    tag: "mobile",
    element: <OfflineSync />,
  },
  {
    titleKey: "services.customSoftware.native.title",
    descriptionKey: "services.customSoftware.native.description",
    tag: "mobile",
    element: <NativeFeatures />,
  },
];

export default function CustomSoftwarePage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto pt-8 pb-12 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl text-4xl font-medium tracking-tight text-neutral-800 sm:text-5xl md:text-6xl dark:text-neutral-200"
        >
          {t("services.customSoftware.page.title")}{" "}
          <span className="text-primary">{t("services.customSoftware.page.titleAccent")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400"
        >
          {t("services.customSoftware.page.description")}
        </motion.p>
      </section>

      {/* Services List */}
      <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
        <ServicesList
          services={customServices}
          caseStudiesLinkKey="services.customSoftware.relatedStudies"
        />
      </section>

      {/* Technologies Grid */}
      <section className="max-w-[1440px] mx-auto pb-16 xl:pb-24 px-6">
        <TechGrid technologies={technologies} title={t("services.customSoftware.technologies")} />
      </section>

      {/* Closing line */}
      <section className="max-w-[1440px] mx-auto pb-16 xl:pb-24 px-6">
        <p className="max-w-3xl text-lg text-neutral-600 dark:text-neutral-400 italic">
          {t("services.customSoftware.closing")}
        </p>
      </section>

      {/* FAQ */}
      <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
        <FAQ
          headingKey1="services.customSoftware.faq.heading1"
          headingKey2="services.customSoftware.faq.heading2"
          items={faqItems}
        />
      </section>

      <ContactCTA />
    </>
  );
}
