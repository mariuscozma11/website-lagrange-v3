"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "motion/react";
import TechGrid, { type Technology } from "@/components/TechGrid";
import FAQ from "@/components/FAQ";
import ServicesList from "@/components/ServicesList";
import ContactCTA from "@/components/ContactCTA";
import Deliverables from "@/components/Deliverables";
import MechanicalDesign from "@/components/interactive/MechanicalDesign";
import AssemblyBuild from "@/components/interactive/AssemblyBuild";
import Commissioning from "@/components/interactive/Commissioning";

const technologies: Technology[] = [
  { name: "Bosch Rexroth", image: "/tech/bosch-rexroth.svg" },
  { name: "item", image: "/tech/item.svg" },
  { name: "Mädler", image: "/tech/madler.svg" },
  { name: "Rollon", image: "/tech/rollon.svg" },
  { name: "igus", image: "/tech/igus.svg" },
  { name: "Festo", image: "/tech/festo.svg" },
  { name: "SMC", image: "/tech/smc.svg" },
  { name: "SKF", image: "/tech/skf.svg" },
  { name: "Misumi", image: "/tech/misumi.svg" },
  { name: "norelem", image: "/tech/norelem.svg" },
  { name: "Schunk", image: "/tech/schunk.svg" },
  { name: "Schmalz", image: "/tech/schmalz.svg" },
];

const faqItems = [
  { questionKey: "services.manufacturing.faq.q1", answerKey: "services.manufacturing.faq.a1" },
  { questionKey: "services.manufacturing.faq.q2", answerKey: "services.manufacturing.faq.a2" },
  { questionKey: "services.manufacturing.faq.q3", answerKey: "services.manufacturing.faq.a3" },
];

const manufacturingServices = [
  {
    slug: "design",
    titleKey: "services.manufacturing.design.title",
    descriptionKey: "services.manufacturing.design.description",
    tag: "manufacturing",
    element: <MechanicalDesign />,
  },
  {
    slug: "build",
    titleKey: "services.manufacturing.build.title",
    descriptionKey: "services.manufacturing.build.description",
    tag: "manufacturing",
    element: <AssemblyBuild />,
  },
  {
    slug: "commission",
    titleKey: "services.manufacturing.commission.title",
    descriptionKey: "services.manufacturing.commission.description",
    tag: "manufacturing",
    element: <Commissioning />,
  },
];

export default function ManufacturingServicePage() {
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
          {t("services.manufacturing.page.title")}{" "}
          <span className="text-primary">{t("services.manufacturing.page.titleAccent")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400"
        >
          {t("services.manufacturing.page.description")}
        </motion.p>
      </section>

      {/* Services List */}
      <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
        <ServicesList services={manufacturingServices} />
      </section>

      {/* Technologies Grid */}
      <section className="max-w-[1440px] mx-auto pb-16 xl:pb-24 px-6">
        <TechGrid technologies={technologies} title={t("services.manufacturing.technologies")} />
      </section>

      <Deliverables />

      {/* FAQ */}
      <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
        <FAQ
          headingKey1="services.manufacturing.faq.heading1"
          headingKey2="services.manufacturing.faq.heading2"
          items={faqItems}
        />
      </section>

      <ContactCTA />
    </>
  );
}
