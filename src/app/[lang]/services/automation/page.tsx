"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "motion/react";
import TechGrid, { type Technology } from "@/components/TechGrid";
import FAQ from "@/components/FAQ";
import ServicesList from "@/components/ServicesList";
import ContactCTA from "@/components/ContactCTA";
import Deliverables from "@/components/Deliverables";
import IntegrationBridge from "@/components/interactive/IntegrationBridge";
import LadderLogic from "@/components/interactive/LadderLogic";
import ProcessMimic from "@/components/interactive/ProcessMimic";
import RobotArm from "@/components/interactive/RobotArm";
import OEEDashboard from "@/components/interactive/OEEDashboard";

const technologies: Technology[] = [
  { name: "Siemens", image: "/tech/siemens.svg" },
  { name: "Beckhoff", image: "/tech/beckhoff.svg" },
  { name: "OPC UA", image: "/tech/opcua.svg" },
  { name: "MQTT", image: "/tech/mqtt.svg" },
  { name: "Grafana", image: "/tech/grafana.svg" },
  { name: "InfluxDB", image: "/tech/influxdb.svg" },
  { name: "Siemens IOT2050", image: "/tech/siemens-iot2050.svg" },
  { name: "Kafka", image: "/tech/kafka.svg" },
  { name: "Python", image: "/tech/python.svg" },
  { name: "Node-RED", image: "/tech/nodered.svg" },
  { name: "Docker", image: "/tech/docker.svg" },
  { name: "PostgreSQL", image: "/tech/postgresql.svg" },
];

const faqItems = [
  { questionKey: "services.automation.faq.q1", answerKey: "services.automation.faq.a1" },
  { questionKey: "services.automation.faq.q2", answerKey: "services.automation.faq.a2" },
  { questionKey: "services.automation.faq.q3", answerKey: "services.automation.faq.a3" },
  { questionKey: "services.automation.faq.q4", answerKey: "services.automation.faq.a4" },
  { questionKey: "services.automation.faq.q5", answerKey: "services.automation.faq.a5" },
  { questionKey: "services.automation.faq.q6", answerKey: "services.automation.faq.a6" },
];

const automationServices = [
  {
    slug: "integration",
    titleKey: "services.automation.integration.title",
    descriptionKey: "services.automation.integration.description",
    tag: "automation",
    element: <IntegrationBridge />,
  },
  {
    slug: "plc",
    titleKey: "services.automation.plc.title",
    descriptionKey: "services.automation.plc.description",
    tag: "automation",
    element: <LadderLogic />,
  },
  {
    slug: "hmi",
    titleKey: "services.automation.hmi.title",
    descriptionKey: "services.automation.hmi.description",
    tag: "automation",
    element: <ProcessMimic />,
  },
  {
    slug: "robotics",
    titleKey: "services.automation.robotics.title",
    descriptionKey: "services.automation.robotics.description",
    tag: "automation",
    element: <RobotArm />,
  },
  {
    slug: "oee",
    titleKey: "services.automation.oee.title",
    descriptionKey: "services.automation.oee.description",
    tag: "automation",
    element: <OEEDashboard />,
  },
];

export default function AutomationServicePage() {
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
          {t("services.automation.page.title")}{" "}
          <span className="text-primary">{t("services.automation.page.titleAccent")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-6 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400"
        >
          {t("services.automation.page.description")}
        </motion.p>
      </section>

      {/* Services List */}
      <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
        <ServicesList services={automationServices} />
      </section>

      {/* Technologies Grid */}
      <section className="max-w-[1440px] mx-auto pb-16 xl:pb-24 px-6">
        <TechGrid technologies={technologies} title={t("services.automation.technologies")} />
      </section>

      {/* Closing line */}
      <section className="max-w-[1440px] mx-auto pb-16 xl:pb-24 px-6">
        <p className="max-w-3xl mx-auto text-center text-lg text-neutral-600 dark:text-neutral-400 italic">
          {t("services.automation.closing")}
        </p>
      </section>

      <Deliverables />

      {/* FAQ */}
      <section className="max-w-[1440px] mx-auto py-16 xl:py-24 px-6">
        <FAQ
          headingKey1="services.automation.faq.heading1"
          headingKey2="services.automation.faq.heading2"
          items={faqItems}
        />
      </section>

      <ContactCTA />
    </>
  );
}
