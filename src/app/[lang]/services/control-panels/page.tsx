"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "motion/react";
import TechGrid, { type Technology } from "@/components/TechGrid";
import FAQ from "@/components/FAQ";
import ServicesList from "@/components/ServicesList";
import ContactCTA from "@/components/ContactCTA";
import Deliverables from "@/components/Deliverables";
import SchematicDraw from "@/components/interactive/SchematicDraw";
import PanelAssembly from "@/components/interactive/PanelAssembly";
import FATChecklist from "@/components/interactive/FATChecklist";
import ComplianceBadge from "@/components/interactive/ComplianceBadge";
import PanelRetrofit from "@/components/interactive/PanelRetrofit";

const technologies: Technology[] = [
  { name: "AutoCAD", image: "/tech/autocad.svg" },
  { name: "QElectroTech", image: "/tech/qelectrotech.svg" },
  { name: "Phoenix Contact", image: "/tech/phoenix-contact.svg" },
  { name: "Sick", image: "/tech/sick.svg" },
  { name: "Wago", image: "/tech/wago.svg" },
  { name: "Eaton", image: "/tech/eaton.svg" },
  { name: "Schrack", image: "/tech/schrack.svg" },
  { name: "EN 60204-1", image: "/tech/en-60204.svg" },
  { name: "EN 61439", image: "/tech/en-61439.svg" },
  { name: "Rittal", image: "/tech/rittal.svg" },
  { name: "Pilz", image: "/tech/pilz.svg" },
  { name: "OMRON", image: "/tech/omron.svg", imageDark: "/tech/omron-dark.svg" },
];

const faqItems = [
  { questionKey: "services.controlPanels.faq.q1", answerKey: "services.controlPanels.faq.a1" },
  { questionKey: "services.controlPanels.faq.q2", answerKey: "services.controlPanels.faq.a2" },
  { questionKey: "services.controlPanels.faq.q3", answerKey: "services.controlPanels.faq.a3" },
  { questionKey: "services.controlPanels.faq.q4", answerKey: "services.controlPanels.faq.a4" },
  { questionKey: "services.controlPanels.faq.q5", answerKey: "services.controlPanels.faq.a5" },
];

const panelServices = [
  {
    slug: "schematic",
    titleKey: "services.controlPanels.schematic.title",
    descriptionKey: "services.controlPanels.schematic.description",
    tag: "control-panels",
    element: <SchematicDraw />,
  },
  {
    slug: "assembly",
    titleKey: "services.controlPanels.assembly.title",
    descriptionKey: "services.controlPanels.assembly.description",
    tag: "control-panels",
    element: <PanelAssembly />,
  },
  {
    slug: "fat",
    titleKey: "services.controlPanels.fat.title",
    descriptionKey: "services.controlPanels.fat.description",
    tag: "control-panels",
    element: <FATChecklist />,
  },
  {
    slug: "compliance",
    titleKey: "services.controlPanels.compliance.title",
    descriptionKey: "services.controlPanels.compliance.description",
    tag: "control-panels",
    element: <ComplianceBadge />,
  },
  {
    slug: "retrofit",
    titleKey: "services.controlPanels.retrofit.title",
    descriptionKey: "services.controlPanels.retrofit.description",
    tag: "control-panels",
    element: <PanelRetrofit />,
  },
];

export default function ControlPanelsServicePage() {
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
          {t("services.controlPanels.page.title")}{" "}
          <span className="text-primary">{t("services.controlPanels.page.titleAccent")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400"
        >
          {t("services.controlPanels.page.description")}
        </motion.p>
      </section>

      {/* Services List */}
      <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
        <ServicesList services={panelServices} />
      </section>

      {/* Technologies Grid */}
      <section className="max-w-[1440px] mx-auto pb-16 xl:pb-24 px-6">
        <TechGrid technologies={technologies} title={t("services.controlPanels.technologies")} />
      </section>

      <Deliverables />

      {/* FAQ */}
      <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
        <FAQ
          headingKey1="services.controlPanels.faq.heading1"
          headingKey2="services.controlPanels.faq.heading2"
          items={faqItems}
        />
      </section>

      <ContactCTA />
    </>
  );
}
